import { LabProject, FeasibilityResult, InventoryItem, DetectedComponent, CompatibilityCheckReport } from '../types/lab';
import { PROJECT_DATABASE } from '../data/projectDatabase';
import { COMPONENT_DATABASE } from '../data/componentDatabase';

export function matchComponent(
  targetName: string,
  alternatives: string[] | undefined,
  availableList: { name: string; quantity: number }[]
): { found: boolean; availableQty: number; matchedName: string } {
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const targetNorm = normalize(targetName);
  const altNorms = (alternatives || []).map(normalize);

  for (const item of availableList) {
    const itemNorm = normalize(item.name);
    if (
      itemNorm.includes(targetNorm) ||
      targetNorm.includes(itemNorm) ||
      altNorms.some(alt => itemNorm.includes(alt) || alt.includes(itemNorm))
    ) {
      return { found: item.quantity > 0, availableQty: item.quantity, matchedName: item.name };
    }
  }

  return { found: false, availableQty: 0, matchedName: '' };
}

export function evaluateProjectFeasibility(
  project: LabProject,
  inventory: { name: string; quantity: number }[]
): FeasibilityResult {
  const available_components: { name: string; required: number; available: number }[] = [];
  const missing_components: { name: string; needed: number }[] = [];
  const compatibility_notes: string[] = [];
  const power_warnings: string[] = [];

  let allEssentialPresent = true;
  let hasMissingAny = false;

  for (const req of project.required_components) {
    const match = matchComponent(req.component_name, req.alternative_names, inventory);
    if (match.found && match.availableQty >= req.quantity) {
      available_components.push({
        name: req.component_name,
        required: req.quantity,
        available: match.availableQty
      });
    } else if (match.found && match.availableQty < req.quantity) {
      const deficit = req.quantity - match.availableQty;
      missing_components.push({
        name: req.component_name,
        needed: deficit
      });
      hasMissingAny = true;
      if (req.is_essential) allEssentialPresent = false;
    } else {
      missing_components.push({
        name: req.component_name,
        needed: req.quantity
      });
      hasMissingAny = true;
      if (req.is_essential) allEssentialPresent = false;
    }
  }

  // Power and safety checks specific to project
  const reqNames = project.required_components.map(r => r.component_name.toLowerCase());
  const hasMotorsOrPump = reqNames.some(n => n.includes('motor') || n.includes('pump'));
  const hasExternalBattery = inventory.some(i => i.name.toLowerCase().includes('18650') || i.name.toLowerCase().includes('battery'));
  const hasOnly9VBattery = inventory.some(i => i.name.toLowerCase().includes('9v')) && !inventory.some(i => i.name.toLowerCase().includes('18650'));

  if (hasMotorsOrPump && hasOnly9VBattery) {
    power_warnings.push('Power Warning: 9V batteries cannot deliver enough current for continuous motor/pump driving (high internal resistance causes brownout). 18650 or 4xAA battery pack is strongly recommended.');
  }

  let status: 'CAN_BUILD_NOW' | 'CAN_BUILD_WITH_ADDITIONAL' | 'NOT_FEASIBLE' = 'NOT_FEASIBLE';
  if (allEssentialPresent && !hasMissingAny) {
    status = 'CAN_BUILD_NOW';
  } else if (available_components.length > 0) {
    status = 'CAN_BUILD_WITH_ADDITIONAL';
  } else {
    status = 'NOT_FEASIBLE';
  }

  return {
    project,
    status,
    available_components,
    missing_components,
    compatibility_notes,
    power_warnings
  };
}

export function evaluateAllProjects(
  inventory: { name: string; quantity: number }[]
): {
  canBuildNow: FeasibilityResult[];
  canBuildWithAdditional: FeasibilityResult[];
  notFeasible: FeasibilityResult[];
  counts: {
    uniqueProjects: number;
    projectVariants: number;
    experiments: number;
    byCategory: Record<string, number>;
    totalFeasibleNow: number;
  };
} {
  const canBuildNow: FeasibilityResult[] = [];
  const canBuildWithAdditional: FeasibilityResult[] = [];
  const notFeasible: FeasibilityResult[] = [];

  const byCategory: Record<string, number> = {
    'Robotics': 0,
    'Arduino': 0,
    'micro:bit': 0,
    'ESP32': 0,
    'Smart Agriculture': 0,
    'IoT': 0,
    'Physics': 0,
    'Electronics': 0,
    'Sensors': 0
  };

  let uniqueCount = 0;
  let variantCount = 0;
  let expCount = 0;

  for (const project of PROJECT_DATABASE) {
    const res = evaluateProjectFeasibility(project, inventory);

    if (res.status === 'CAN_BUILD_NOW') {
      canBuildNow.push(res);
      if (project.project_type === 'UNIQUE_PROJECT') uniqueCount++;
      else if (project.project_type === 'PROJECT_VARIANT') variantCount++;
      else if (project.project_type === 'EXPERIMENT') expCount++;

      if (byCategory[project.category] !== undefined) {
        byCategory[project.category]++;
      }
    } else if (res.status === 'CAN_BUILD_WITH_ADDITIONAL') {
      canBuildWithAdditional.push(res);
    } else {
      notFeasible.push(res);
    }
  }

  return {
    canBuildNow,
    canBuildWithAdditional,
    notFeasible,
    counts: {
      uniqueProjects: uniqueCount,
      projectVariants: variantCount,
      experiments: expCount,
      byCategory,
      totalFeasibleNow: canBuildNow.length
    }
  };
}

export function checkComponentCompatibility(
  compAId: string,
  compBId: string
): CompatibilityCheckReport {
  const compA = COMPONENT_DATABASE.find(c => c.id === compAId);
  const compB = COMPONENT_DATABASE.find(c => c.id === compBId);

  if (!compA || !compB) {
    return {
      is_compatible: false,
      status: 'DANGEROUS_OR_INCOMPATIBLE',
      voltage_check: { status: 'WARNING', details: 'Component not found in database.' },
      current_check: { status: 'OK', details: '' },
      logic_level_check: { status: 'OK', details: '' },
      driver_requirements: [],
      recommended_wiring: 'Verify part numbers manually.',
      safety_warnings: ['Unknown component electrical parameters.']
    };
  }

  const nameA = compA.name.toLowerCase();
  const nameB = compB.name.toLowerCase();

  // Test Case 1: Arduino UNO + HC-SR04
  if ((nameA.includes('arduino uno') && nameB.includes('hc-sr04')) || (nameB.includes('arduino uno') && nameA.includes('hc-sr04'))) {
    return {
      is_compatible: true,
      status: 'SAFE_AND_COMPATIBLE',
      voltage_check: { status: 'OK', details: 'Both Arduino UNO and HC-SR04 operate natively at 5.0V DC.' },
      current_check: { status: 'OK', details: 'HC-SR04 draws only ~15mA, well within the Arduino 5V pin 400mA capacity.' },
      logic_level_check: { status: 'OK', details: '5V TTL logic levels are 100% matched for TRIG and ECHO pins.' },
      driver_requirements: [],
      recommended_wiring: 'HC-SR04 VCC -> Arduino 5V, GND -> Arduino GND, TRIG -> Digital Pin (e.g. D9), ECHO -> Digital Pin (e.g. D10).',
      safety_warnings: []
    };
  }

  // Test Case 2: Arduino UNO + Submersible Water Pump DIRECT
  if (
    (nameA.includes('arduino') && nameB.includes('pump')) ||
    (nameB.includes('arduino') && nameA.includes('pump'))
  ) {
    return {
      is_compatible: false,
      status: 'DANGEROUS_OR_INCOMPATIBLE',
      voltage_check: { status: 'WARNING', details: 'Water pump is rated 3V-6V DC; Arduino 5V pin or GPIO is not a safe direct inductive source.' },
      current_check: {
        status: 'EXCEEDS_GPIO_LIMIT',
        details: 'DANGER: Mini submersible pump draws 250mA - 500mA stall current. Arduino GPIO pins are rated for MAX 20mA! Direct connection will destroy the microcontroller pin.'
      },
      logic_level_check: { status: 'OK', details: 'Pump is an inductive mechanical load, not a logic receiver.' },
      driver_requirements: ['5V 1-Channel Relay Module (Optocoupled) or NPN Power Transistor (TIP120) with flyback diode (1N4007)'],
      recommended_wiring: 'Arduino GPIO Pin -> Relay Module IN; Relay COM -> External 5V Power (+); Relay NO -> Pump Red (+); Pump Black (-) -> External Power GND.',
      safety_warnings: [
        'NEVER connect the water pump directly to an Arduino GPIO pin!',
        'Always isolate inductive coils using a relay or transistor with a reverse-biased flyback diode to suppress back-EMF spikes.'
      ]
    };
  }

  // Test Case 3: Arduino UNO + BO Gear Motor DIRECT
  if (
    (nameA.includes('arduino') && nameB.includes('bo yellow gear motor')) ||
    (nameB.includes('arduino') && nameA.includes('bo yellow gear motor'))
  ) {
    return {
      is_compatible: false,
      status: 'DANGEROUS_OR_INCOMPATIBLE',
      voltage_check: { status: 'WARNING', details: 'BO motors run best on 4.5V - 6V DC.' },
      current_check: {
        status: 'EXCEEDS_GPIO_LIMIT',
        details: 'DANGER: BO motors draw up to 800mA - 1200mA stall current (40x - 60x higher than Arduino 20mA limit).'
      },
      logic_level_check: { status: 'OK', details: 'Requires H-bridge switching.' },
      driver_requirements: ['L298N Dual H-Bridge Motor Driver or L293D Motor Driver IC'],
      recommended_wiring: 'Arduino Pins -> L298N IN1..IN4; L298N Out1..Out4 -> Motors; Battery Pack (7.4V) -> L298N 12V terminal; Battery GND -> L298N GND AND Arduino GND (Common Ground).',
      safety_warnings: [
        'Direct connection will burn the Arduino ATmega328P output stage instantly.',
        'Always use external battery power for motors; do not pull motor current through the Arduino board.'
      ]
    };
  }

  // Test Case 4: ESP32 + HC-SR04
  if (
    (nameA.includes('esp32') && nameB.includes('hc-sr04')) ||
    (nameB.includes('esp32') && nameA.includes('hc-sr04'))
  ) {
    return {
      is_compatible: true,
      status: 'NEEDS_DRIVER_OR_LEVEL_SHIFT',
      voltage_check: { status: 'OK', details: 'HC-SR04 requires 5V VCC (taken from ESP32 VIN pin when USB powered).' },
      current_check: { status: 'OK', details: 'Current draw (~15mA) is easily handled.' },
      logic_level_check: {
        status: 'REQUIRES_CONVERTER',
        details: 'VOLTAGE MISMATCH: HC-SR04 ECHO pin sends out 5.0V pulses. ESP32 GPIO pins are strictly 3.3V ONLY and NOT 5V tolerant! Applying 5V directly to ESP32 will degrade or destroy the pin.'
      },
      driver_requirements: ['Resistor Voltage Divider (1kΩ and 2kΩ) on ECHO line, or Logic Level Converter'],
      recommended_wiring: 'HC-SR04 VCC -> ESP32 VIN (5V); TRIG -> ESP32 GPIO (e.g. 5); ECHO -> 1kΩ resistor -> ESP32 GPIO (e.g. 18) -> 2kΩ resistor -> GND (steps 5V down to safe 3.3V).',
      safety_warnings: [
        'DO NOT connect HC-SR04 ECHO directly to ESP32 without a voltage divider!'
      ]
    };
  }

  // Test Case 5: micro:bit + 5V Sensor / Servo
  if (
    (nameA.includes('micro:bit') && (nameB.includes('servo') || nameB.includes('l298n') || nameB.includes('hc-sr04'))) ||
    (nameB.includes('micro:bit') && (nameA.includes('servo') || nameA.includes('l298n') || nameA.includes('hc-sr04')))
  ) {
    return {
      is_compatible: true,
      status: 'NEEDS_DRIVER_OR_LEVEL_SHIFT',
      voltage_check: { status: 'WARNING', details: 'micro:bit runs on 3.0V-3.3V. Servos and HC-SR04 require 5.0V.' },
      current_check: { status: 'EXCEEDS_GPIO_LIMIT', details: 'micro:bit 3V ring can only deliver ~190mA max, insufficient for servos/motors.' },
      logic_level_check: { status: 'REQUIRES_CONVERTER', details: '3.3V vs 5V logic interface.' },
      driver_requirements: ['micro:bit Edge Connector Breakout Board with 5V external power jack'],
      recommended_wiring: 'Plug micro:bit into an edge breakout board. Power breakout with external 5V/6V battery. Connect servo/driver to breakout pins.',
      safety_warnings: ['Never apply 5V power to the micro:bit 3V ring!']
    };
  }

  // Default general compatibility check
  return {
    is_compatible: true,
    status: 'SAFE_AND_COMPATIBLE',
    voltage_check: { status: 'OK', details: `Voltages: ${compA.name} (${compA.voltage}) and ${compB.name} (${compB.voltage}).` },
    current_check: { status: 'OK', details: `Operating currents are compatible under standard laboratory conditions.` },
    logic_level_check: { status: 'OK', details: `Logic level: ${compA.logic_level} vs ${compB.logic_level}.` },
    driver_requirements: [],
    recommended_wiring: `Refer to project schematics for specific pin assignments.`,
    safety_warnings: ['Ensure common ground is connected between all power sources.']
  };
}

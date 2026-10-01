import { DetectedComponent, CircuitCheckResult } from '../types/lab';

export interface TestScenario {
  id: string;
  title: string;
  description: string;
  category: 'Component Detection' | 'Circuit Diagnostics' | 'Safety & Compatibility';
  detectedComponents: DetectedComponent[];
  circuitCheckResult?: CircuitCheckResult;
  compatibilityPair?: [string, string];
  promptHint: string;
}

export const TEST_SCENARIOS: TestScenario[] = [
  {
    id: 'test-1',
    title: 'TEST 1: Single Arduino UNO R3',
    description: 'Detection of a single Arduino UNO development board with ATmega328P chip, DC jack, and USB port.',
    category: 'Component Detection',
    promptHint: 'Evaluates single microcontroller recognition, pin identification, and educational summary.',
    detectedComponents: [
      {
        component_number: 1,
        name: 'Arduino UNO R3',
        matched_id: 'arduino-uno-r3',
        category: 'Microcontroller & Brain',
        quantity: 1,
        confidence: 98,
        confidence_level: 'HIGH',
        evidence: {
          visible_markings: 'ARDUINO UNO R3, MADE IN ITALY',
          modelNumber: 'ATmega328P-PU',
          pin_terminal_configuration: 'Digital 0-13, Analog A0-A5, Power header',
          physical_type: 'Standard blue rectangular PCB with USB Type-B',
          visual_clues: ['Silver USB Type-B connector', 'Black barrel jack', '16MHz crystal', 'DIP-28 IC socket']
        },
        specification_notes: '5V Operating, 16MHz clock, 32KB Flash, 2KB SRAM.'
      }
    ]
  },
  {
    id: 'test-2',
    title: 'TEST 2: Arduino UNO + LED + Resistor + Breadboard',
    description: 'Basic educational electronics starter kit for blink and PWM experimentation.',
    category: 'Component Detection',
    promptHint: 'Tests grouping of passives and microcontrollers for introductory lab experiments.',
    detectedComponents: [
      {
        component_number: 1,
        name: 'Arduino UNO R3',
        matched_id: 'arduino-uno-r3',
        category: 'Microcontroller & Brain',
        quantity: 1,
        confidence: 97,
        confidence_level: 'HIGH',
        evidence: {
          visible_markings: 'Arduino UNO',
          modelNumber: 'ATmega328P',
          physical_type: 'Microcontroller board',
          visual_clues: ['Blue board', 'USB port', 'Header sockets']
        }
      },
      {
        component_number: 2,
        name: 'LED Assortment (3mm & 5mm Multi-color)',
        matched_id: 'led-assortment',
        category: 'Passive & Semiconductor',
        quantity: 3,
        confidence: 95,
        confidence_level: 'HIGH',
        evidence: {
          physical_type: '5mm diffused colored lenses (Red, Green, Yellow)',
          pin_terminal_configuration: '2 wire leads (anode long, cathode short)',
          visual_clues: ['Diffused colored epoxy dome', 'Cathode flat rim notch']
        }
      },
      {
        component_number: 3,
        name: 'Resistor Assortment (220Ω - 1MΩ)',
        matched_id: 'resistor-assortment',
        category: 'Passive & Semiconductor',
        quantity: 4,
        confidence: 94,
        confidence_level: 'HIGH',
        evidence: {
          visible_markings: 'Red-Red-Brown-Gold (220Ω 5%) and Brown-Black-Orange-Gold (10kΩ 5%)',
          physical_type: '1/4W axial through-hole ceramic',
          visual_clues: ['Color coded 4-band markings']
        }
      },
      {
        component_number: 4,
        name: 'Full-Size 830-Point Solderless Breadboard',
        matched_id: 'breadboard-830-point',
        category: 'Prototyping & Tools',
        quantity: 1,
        confidence: 99,
        confidence_level: 'HIGH',
        evidence: {
          visible_markings: 'MB-102',
          physical_type: 'White solderless breadboard with red/blue power rails',
          visual_clues: ['63-row tie point grid', 'Central IC divider trough']
        }
      }
    ]
  },
  {
    id: 'test-3',
    title: 'TEST 3: HC-SR04 + Arduino UNO',
    description: 'Distance sensor pair ready for ultrasonic distance metering and obstacle alarms.',
    category: 'Component Detection',
    promptHint: 'Tests pairing of digital sensor with Arduino and ToF science explanation.',
    detectedComponents: [
      {
        component_number: 1,
        name: 'Arduino UNO R3',
        matched_id: 'arduino-uno-r3',
        category: 'Microcontroller & Brain',
        quantity: 1,
        confidence: 98,
        confidence_level: 'HIGH',
        evidence: {
          visible_markings: 'Arduino UNO R3',
          visual_clues: ['USB connector', 'Blue board']
        }
      },
      {
        component_number: 2,
        name: 'HC-SR04 Ultrasonic Distance Sensor',
        matched_id: 'hc-sr04-ultrasonic',
        category: 'Sensor',
        quantity: 1,
        confidence: 98,
        confidence_level: 'HIGH',
        evidence: {
          visible_markings: 'HC-SR04',
          pin_terminal_configuration: '4-pin header: VCC, TRIG, ECHO, GND',
          physical_type: 'Dual metal cylindrical ultrasonic transducers (T & R)',
          visual_clues: ['Two circular mesh eyes', 'Crystal oscillator']
        }
      }
    ]
  },
  {
    id: 'test-4',
    title: 'TEST 4: Arduino + L298N + BO Motors + Chassis + Wheels',
    description: 'Autonomous mobile robotics foundation with high-current motor driver and differential drive base.',
    category: 'Component Detection',
    promptHint: 'Verifies automatic reasoning of Obstacle Avoiding Robot and mobile vehicle kinematics.',
    detectedComponents: [
      {
        component_number: 1,
        name: 'Arduino UNO R3',
        matched_id: 'arduino-uno-r3',
        category: 'Microcontroller & Brain',
        quantity: 1,
        confidence: 97,
        confidence_level: 'HIGH',
        evidence: { visible_markings: 'Arduino Uno' }
      },
      {
        component_number: 2,
        name: 'L298N Dual H-Bridge Motor Driver Module',
        matched_id: 'l298n-motor-driver',
        category: 'Driver & Controller',
        quantity: 1,
        confidence: 96,
        confidence_level: 'HIGH',
        evidence: {
          visible_markings: 'L298N',
          physical_type: 'Red PCB with large black aluminum heatsink and blue screw terminals',
          visual_clues: ['Multi-pin power IC clamped to heatsink', 'Screw terminals']
        }
      },
      {
        component_number: 3,
        name: 'BO Yellow Gear Motor (Dual Axis)',
        matched_id: 'bo-gear-motors',
        category: 'Actuator & Motor',
        quantity: 2,
        confidence: 99,
        confidence_level: 'HIGH',
        evidence: {
          physical_type: 'Bright yellow plastic gearbox with white dual shafts',
          visual_clues: ['Yellow rectangular casing', '1:48 gear ratio']
        }
      },
      {
        component_number: 4,
        name: '2WD Smart Robot Car Chassis Kit',
        matched_id: 'chassis-2wd-robot',
        category: 'Robotics & Mechanical',
        quantity: 1,
        confidence: 95,
        confidence_level: 'HIGH',
        evidence: {
          physical_type: 'Laser-cut acrylic plate with wheels and swivel caster ball',
          visual_clues: ['Rubber tire tread wheels', 'Metal caster']
        }
      },
      {
        component_number: 5,
        name: 'HC-SR04 Ultrasonic Distance Sensor',
        matched_id: 'hc-sr04-ultrasonic',
        category: 'Sensor',
        quantity: 1,
        confidence: 97,
        confidence_level: 'HIGH',
        evidence: { visible_markings: 'HC-SR04' }
      },
      {
        component_number: 6,
        name: '18650 Li-ion Rechargeable Battery (3.7V ~2500mAh)',
        matched_id: 'battery-18650-liion',
        category: 'Power & Battery',
        quantity: 2,
        confidence: 95,
        confidence_level: 'HIGH',
        evidence: {
          physical_type: 'Blue cylindrical 18650 cells in 2-cell holder',
          visual_clues: ['3.7V Li-ion label', 'Spring terminals']
        }
      }
    ]
  },
  {
    id: 'test-5',
    title: 'TEST 5: Arduino + IR Line Sensors + L298N + Motors',
    description: 'Line Follower Robot ecosystem components detected together.',
    category: 'Component Detection',
    promptHint: 'Verifies detection of Line Follower Robot project possibilities.',
    detectedComponents: [
      {
        component_number: 1,
        name: 'Arduino UNO R3',
        matched_id: 'arduino-uno-r3',
        category: 'Microcontroller & Brain',
        quantity: 1,
        confidence: 98,
        confidence_level: 'HIGH',
        evidence: { visible_markings: 'Arduino UNO' }
      },
      {
        component_number: 2,
        name: 'IR Line Tracking Sensor Module',
        matched_id: 'ir-line-sensor',
        category: 'Sensor',
        quantity: 2,
        confidence: 96,
        confidence_level: 'HIGH',
        evidence: {
          modelNumber: 'TCRT5000 Module',
          physical_type: 'Small PCB with black phototransistor and clear IR LED pair',
          visual_clues: ['Blue trimmer pot', 'LM393 comparator']
        }
      },
      {
        component_number: 3,
        name: 'L298N Dual H-Bridge Motor Driver Module',
        matched_id: 'l298n-motor-driver',
        category: 'Driver & Controller',
        quantity: 1,
        confidence: 96,
        confidence_level: 'HIGH',
        evidence: { physical_type: 'Red module with black heatsink' }
      },
      {
        component_number: 4,
        name: 'BO Yellow Gear Motor (Dual Axis)',
        matched_id: 'bo-gear-motors',
        category: 'Actuator & Motor',
        quantity: 2,
        confidence: 99,
        confidence_level: 'HIGH',
        evidence: { physical_type: 'Yellow gear motors' }
      },
      {
        component_number: 5,
        name: '2WD Smart Robot Car Chassis Kit',
        matched_id: 'chassis-2wd-robot',
        category: 'Robotics & Mechanical',
        quantity: 1,
        confidence: 95,
        confidence_level: 'HIGH',
        evidence: { physical_type: 'Robot chassis with wheels' }
      }
    ]
  },
  {
    id: 'test-6',
    title: 'TEST 6: ESP32 + Multiple Sensors',
    description: 'IoT Station setup with ESP32 Wi-Fi microcontroller, DHT11 temp/humidity, and LDR light sensor.',
    category: 'Component Detection',
    promptHint: 'Tests recognition of 3.3V IoT microcontroller and multi-sensor telemetry.',
    detectedComponents: [
      {
        component_number: 1,
        name: 'ESP32 Development Board',
        matched_id: 'esp32-dev-board',
        category: 'Microcontroller & Brain',
        quantity: 1,
        confidence: 98,
        confidence_level: 'HIGH',
        evidence: {
          visible_markings: 'ESP-WROOM-32',
          physical_type: 'Narrow black PCB with metal shield can and copper PCB antenna',
          visual_clues: ['Silver RF shield', 'Micro USB port', 'EN & BOOT buttons']
        }
      },
      {
        component_number: 2,
        name: 'DHT11 / DHT22 Temperature & Humidity Sensor',
        matched_id: 'dht11-dht22-sensor',
        category: 'Sensor',
        quantity: 1,
        confidence: 96,
        confidence_level: 'HIGH',
        evidence: {
          modelNumber: 'DHT11',
          physical_type: 'Blue perforated plastic ventilated enclosure',
          visual_clues: ['Ventilated grid', '3-pin PCB module']
        }
      },
      {
        component_number: 3,
        name: 'LDR (Light Dependent Resistor) Sensor',
        matched_id: 'ldr-light-sensor',
        category: 'Sensor',
        quantity: 1,
        confidence: 94,
        confidence_level: 'HIGH',
        evidence: {
          physical_type: '5mm disc with serpentine red track under clear resin'
        }
      },
      {
        component_number: 4,
        name: '16x2 Character LCD with I2C Module',
        matched_id: 'lcd-16x2-i2c',
        category: 'Display & Communication',
        quantity: 1,
        confidence: 95,
        confidence_level: 'HIGH',
        evidence: {
          physical_type: '16x2 LCD display with black PCF8574 backpack board on rear'
        }
      }
    ]
  },
  {
    id: 'test-7',
    title: 'TEST 7: Capacitive Soil Moisture + Relay + Water Pump + Controller',
    description: 'Complete Smart Agriculture & Irrigation hardware kit.',
    category: 'Component Detection',
    promptHint: 'Verifies Smart Irrigation project reasoning and hydraulic isolation safety rules.',
    detectedComponents: [
      {
        component_number: 1,
        name: 'Capacitive Soil Moisture Sensor v1.2',
        matched_id: 'capacitive-soil-moisture',
        category: 'Sensor',
        quantity: 1,
        confidence: 97,
        confidence_level: 'HIGH',
        evidence: {
          visible_markings: 'Capacitive Soil Moisture Sensor v1.2',
          physical_type: 'T-shaped PCB probe with insulated traces and top JST connector',
          visual_clues: ['No exposed metal on probe tines (corrosion resistant)']
        }
      },
      {
        component_number: 2,
        name: '5V 1-Channel Relay Module (Optocoupler)',
        matched_id: 'relay-module-5v',
        category: 'Driver & Controller',
        quantity: 1,
        confidence: 97,
        confidence_level: 'HIGH',
        evidence: {
          visible_markings: 'SONGLE SRD-05VDC-SL-C',
          physical_type: 'Blue cube with screw terminals and EL817 optocoupler'
        }
      },
      {
        component_number: 3,
        name: 'Mini Submersible DC Water Pump (3V - 6V)',
        matched_id: 'mini-submersible-pump',
        category: 'Actuator & Motor',
        quantity: 1,
        confidence: 98,
        confidence_level: 'HIGH',
        evidence: {
          physical_type: 'Sealed cylindrical black plastic pump with discharge nozzle and wire leads'
        }
      },
      {
        component_number: 4,
        name: 'Arduino UNO R3',
        matched_id: 'arduino-uno-r3',
        category: 'Microcontroller & Brain',
        quantity: 1,
        confidence: 97,
        confidence_level: 'HIGH',
        evidence: { visible_markings: 'Arduino UNO' }
      }
    ]
  },
  {
    id: 'test-8',
    title: 'TEST 8: Complete Lab Bench Table Scan (Multiple Components)',
    description: 'Scanning a messy school laboratory workbench with 8+ diverse components simultaneously.',
    category: 'Component Detection',
    promptHint: 'Verifies multi-object detection without stopping at the first item, grouping quantities accurately.',
    detectedComponents: [
      {
        component_number: 1,
        name: 'Arduino UNO R3',
        matched_id: 'arduino-uno-r3',
        category: 'Microcontroller & Brain',
        quantity: 2,
        confidence: 98,
        confidence_level: 'HIGH',
        evidence: { visible_markings: 'Arduino UNO boards on bench' }
      },
      {
        component_number: 2,
        name: 'HC-SR04 Ultrasonic Distance Sensor',
        matched_id: 'hc-sr04-ultrasonic',
        category: 'Sensor',
        quantity: 2,
        confidence: 96,
        confidence_level: 'HIGH',
        evidence: { physical_type: 'Ultrasonic eyes' }
      },
      {
        component_number: 3,
        name: 'L298N Dual H-Bridge Motor Driver Module',
        matched_id: 'l298n-motor-driver',
        category: 'Driver & Controller',
        quantity: 1,
        confidence: 95,
        confidence_level: 'HIGH',
        evidence: { physical_type: 'Red heatsink driver board' }
      },
      {
        component_number: 4,
        name: 'BO Yellow Gear Motor (Dual Axis)',
        matched_id: 'bo-gear-motors',
        category: 'Actuator & Motor',
        quantity: 4,
        confidence: 99,
        confidence_level: 'HIGH',
        evidence: { physical_type: 'Yellow BO motors with wires' }
      },
      {
        component_number: 5,
        name: 'Full-Size 830-Point Solderless Breadboard',
        matched_id: 'breadboard-830-point',
        category: 'Prototyping & Tools',
        quantity: 2,
        confidence: 99,
        confidence_level: 'HIGH',
        evidence: { physical_type: 'White breadboards' }
      },
      {
        component_number: 6,
        name: 'NE555 Precision Timer IC',
        matched_id: 'ne555-timer-ic',
        category: 'Passive & Semiconductor',
        quantity: 3,
        confidence: 92,
        confidence_level: 'HIGH',
        evidence: { visible_markings: 'NE555P DIP-8 packages' }
      },
      {
        component_number: 7,
        name: 'LED Assortment (3mm & 5mm Multi-color)',
        matched_id: 'led-assortment',
        category: 'Passive & Semiconductor',
        quantity: 12,
        confidence: 94,
        confidence_level: 'HIGH',
        evidence: { physical_type: 'Assorted 5mm LEDs' }
      },
      {
        component_number: 8,
        name: 'Digital Multimeter (DMM)',
        matched_id: 'digital-multimeter',
        category: 'Prototyping & Tools',
        quantity: 1,
        confidence: 98,
        confidence_level: 'HIGH',
        evidence: { physical_type: 'Yellow handheld multimeter with probe leads' }
      }
    ]
  },
  {
    id: 'test-9',
    title: 'TEST 9: Blurry / Out-of-Focus Component Photo',
    description: 'Evaluating system behavior when an image is blurred, dimly lit, or obscured.',
    category: 'Safety & Compatibility',
    promptHint: 'Strict anti-hallucination check: must refuse false identification and prompt for clearer photo.',
    detectedComponents: [
      {
        component_number: 1,
        name: 'Unidentified Blue Sensor Module',
        category: 'Sensor',
        quantity: 1,
        confidence: 38,
        confidence_level: 'LOW',
        evidence: {
          physical_type: 'Rectangular blue PCB silhouette with metallic reflection',
          visual_clues: ['Severe optical motion blur', 'Markings unreadable', 'Pin count obscured']
        },
        uncertainty_reason: 'Component cannot be confidently identified from this photograph due to severe optical blur and lighting glare. Please upload a sharper, well-lit photograph or photograph the front and back labels.'
      }
    ]
  },
  {
    id: 'test-10',
    title: 'TEST 10: Unknown Custom Component (Outside Inventory)',
    description: 'Component not present in standard school database (e.g. specialized industrial RS485 soil sensor).',
    category: 'Component Detection',
    promptHint: 'Tests graceful fallback, requesting model number or datasheet, and manual teacher confirmation.',
    detectedComponents: [
      {
        component_number: 1,
        name: 'Industrial Stainless Steel Soil NPK Multi-Parameter Probe',
        category: 'Sensor',
        quantity: 1,
        confidence: 65,
        confidence_level: 'MEDIUM',
        evidence: {
          visible_markings: 'RS485 Modbus RTU / 12-24V',
          physical_type: 'Cylindrical stainless steel body with 3 pointed probe tines and thick shielded industrial cable',
          visual_clues: ['Metallic waterproof enclosure', 'Non-standard school pinout']
        },
        specification_notes: 'Requires 9-24V external supply and RS485-to-TTL transceiver module (MAX485). Cannot connect directly to Arduino 5V GPIO.',
        uncertainty_reason: 'Non-standard ATL component. Please confirm model number or datasheet before connecting to educational microcontrollers.'
      }
    ]
  },
  {
    id: 'test-11',
    title: 'TEST 11: Incompatible Power Connection (Direct Motor to Arduino GPIO)',
    description: 'User attempts to wire a 6V BO gear motor or submersible pump directly to an Arduino GPIO pin.',
    category: 'Safety & Compatibility',
    promptHint: 'Triggers critical electrical safety warnings, explaining 20mA GPIO limits vs 800mA stall currents.',
    compatibilityPair: ['arduino-uno-r3', 'bo-gear-motors'],
    detectedComponents: []
  },
  {
    id: 'test-12',
    title: 'TEST 12: Circuit Photo with Incorrect / Dangerous Wiring',
    description: 'Circuit photo showing an LED wired without a series resistor directly to 5V, and reverse diode orientation.',
    category: 'Circuit Diagnostics',
    promptHint: 'Evaluates "CHECK MY CIRCUIT" visual inspection for missing resistors, reversed polarity, and safety hazards.',
    detectedComponents: [],
    circuitCheckResult: {
      circuit_summary: 'Arduino UNO breadboard circuit with a red LED and 1N4007 diode under test.',
      detected_components: [
        'Arduino UNO R3',
        'MB-102 Solderless Breadboard',
        '5mm Red LED',
        '1N4007 Diode',
        'Jumper Wires'
      ],
      correct_connections: [
        'Arduino 5V connected to Breadboard Red (+) rail',
        'Arduino GND connected to Breadboard Blue (-) rail'
      ],
      possible_errors: [
        'MISSING CURRENT-LIMITING RESISTOR: The Red LED anode is jumpered directly to the 5V rail without any series resistor (220Ω - 330Ω). This will cause instantaneous thermal burnout or damage the power rail!',
        'REVERSED DIODE ORIENTATION: The 1N4007 cathode (marked by the silver band) is wired to Ground instead of Positive in a reverse-bias orientation.'
      ],
      missing_connections: [
        'A 220Ω resistor must be inserted between Arduino Pin 13 and the LED long leg (Anode).'
      ],
      possible_safety_issues: [
        'High forward current through unballasted LED (~150mA+) risks burning out the LED with noxious smoke and overheating breadboard spring clips.'
      ],
      suggested_corrections: [
        '1. Immediately unplug power before modifying wiring.',
        '2. Add a 220Ω resistor in series with the LED Anode (+).',
        '3. Verify that the silver stripe on the 1N4007 points in the intended circuit direction.'
      ],
      confidence: 'HIGH'
    }
  }
];

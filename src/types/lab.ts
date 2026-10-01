export type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'UNKNOWN';

export type ComponentCategory =
  | 'Microcontroller & Brain'
  | 'Sensor'
  | 'Actuator & Motor'
  | 'Driver & Controller'
  | 'Power & Battery'
  | 'Passive & Semiconductor'
  | 'Display & Communication'
  | 'Robotics & Mechanical'
  | 'Prototyping & Tools'
  | 'Other';

export interface ComponentPin {
  name: string;
  type: 'Power' | 'Ground' | 'Digital Input' | 'Digital Output' | 'Analog Input' | 'Analog Output' | 'PWM' | 'I2C' | 'SPI' | 'UART' | 'Passive';
  description: string;
  voltage?: string;
}

export interface LabComponent {
  id: string;
  name: string;
  aliases: string[];
  category: ComponentCategory;
  modelNumber?: string;
  visual_features: string[];
  working_principle: string;
  scientific_principle: string;
  what_is_it: string;
  what_it_does: string;
  inputs: string;
  outputs: string;
  pins: ComponentPin[];
  voltage: string;
  operating_voltage_min?: number;
  operating_voltage_max?: number;
  current: string;
  max_current_draw_ma?: number;
  logic_level: string;
  interfaces: string[];
  compatible_boards: string[];
  common_projects: string[];
  required_drivers: string[];
  safety: string[];
  never_connect_to: string[];
  fun_fact?: string;
  student_summary: {
    simple_definition: string;
    how_it_works_kid: string;
    why_we_use_it: string;
    golden_safety_rule: string;
  };
}

export interface DetectedComponent {
  component_number: number;
  name: string;
  matched_id?: string;
  category: ComponentCategory;
  quantity: number;
  confidence: number;
  confidence_level: ConfidenceLevel;
  evidence: {
    visible_markings?: string;
    model_number?: string;
    modelNumber?: string;
    pin_terminal_configuration?: string;
    physical_type?: string;
    visual_clues?: string[];
  };
  specification_notes?: string;
  uncertainty_reason?: string;
  user_confirmed?: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: ComponentCategory;
  total_qty: number;
  working_qty: number;
  damaged_qty: number;
  available_qty: number;
  unit?: string;
  notes?: string;
}

export type ProjectDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type ProjectType = 'UNIQUE_PROJECT' | 'PROJECT_VARIANT' | 'EXPERIMENT';

export interface ProjectRequirement {
  component_name: string;
  quantity: number;
  alternative_names?: string[];
  is_essential: boolean;
}

export interface LabProject {
  id: string;
  name: string;
  project_type: ProjectType;
  category: 'Robotics' | 'Arduino' | 'micro:bit' | 'ESP32' | 'Smart Agriculture' | 'IoT' | 'Physics' | 'Electronics' | 'Sensors';
  difficulty: ProjectDifficulty;
  class_levels: number[];
  objective: string;
  problem_statement: string;
  scientific_principle: string;
  required_components: ProjectRequirement[];
  working_explanation: string;
  block_diagram: {
    inputs: string[];
    processing: string[];
    outputs: string[];
    power: string[];
  };
  circuit_connections: {
    component: string;
    pin: string;
    connection: string;
    notes?: string;
  }[];
  programming_board: 'Arduino UNO' | 'ESP32' | 'ESP32-CAM' | 'BBC micro:bit v2' | 'NE555 / Discrete' | 'Generic';
  code_language: 'C++' | 'MicroPython' | 'None (Hardware only)';
  code_template: string;
  required_libraries: string[];
  expected_output: string;
  troubleshooting: {
    issue: string;
    cause: string;
    solution: string;
  }[];
  safety_precautions: string[];
  real_life_applications: string[];
  future_improvements: string[];
  viva_questions: {
    question: string;
    answer: string;
  }[];
}

export interface FeasibilityResult {
  project: LabProject;
  status: 'CAN_BUILD_NOW' | 'CAN_BUILD_WITH_ADDITIONAL' | 'NOT_FEASIBLE';
  available_components: { name: string; required: number; available: number }[];
  missing_components: { name: string; needed: number }[];
  compatibility_notes: string[];
  power_warnings: string[];
}

export interface CircuitCheckResult {
  circuit_summary: string;
  detected_components: string[];
  correct_connections: string[];
  possible_errors: string[];
  missing_connections: string[];
  possible_safety_issues: string[];
  suggested_corrections: string[];
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface CompatibilityCheckReport {
  is_compatible: boolean;
  status: 'SAFE_AND_COMPATIBLE' | 'NEEDS_DRIVER_OR_LEVEL_SHIFT' | 'DANGEROUS_OR_INCOMPATIBLE';
  voltage_check: {
    status: 'OK' | 'MISMATCH' | 'WARNING';
    details: string;
  };
  current_check: {
    status: 'OK' | 'EXCEEDS_GPIO_LIMIT' | 'REQUIRES_EXTERNAL_POWER';
    details: string;
  };
  logic_level_check: {
    status: 'OK' | 'REQUIRES_CONVERTER' | 'TOLERANT';
    details: string;
  };
  driver_requirements: string[];
  recommended_wiring: string;
  safety_warnings: string[];
}

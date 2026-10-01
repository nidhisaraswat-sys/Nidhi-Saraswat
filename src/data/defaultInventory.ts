import { InventoryItem } from '../types/lab';

export const DEFAULT_LAB_INVENTORY: InventoryItem[] = [
  // Microcontrollers
  {
    id: 'inv-ard-uno',
    name: 'Arduino UNO R3',
    category: 'Microcontroller & Brain',
    total_qty: 12,
    working_qty: 10,
    damaged_qty: 2,
    available_qty: 10,
    unit: 'pcs'
  },
  {
    id: 'inv-microbit',
    name: 'BBC micro:bit v2',
    category: 'Microcontroller & Brain',
    total_qty: 8,
    working_qty: 8,
    damaged_qty: 0,
    available_qty: 8,
    unit: 'pcs'
  },
  {
    id: 'inv-esp32',
    name: 'ESP32 Development Board',
    category: 'Microcontroller & Brain',
    total_qty: 6,
    working_qty: 6,
    damaged_qty: 0,
    available_qty: 6,
    unit: 'pcs'
  },
  // Sensors
  {
    id: 'inv-hcsr04',
    name: 'HC-SR04 Ultrasonic Distance Sensor',
    category: 'Sensor',
    total_qty: 10,
    working_qty: 9,
    damaged_qty: 1,
    available_qty: 9,
    unit: 'pcs'
  },
  {
    id: 'inv-ir-line',
    name: 'IR Line Tracking Sensor Module',
    category: 'Sensor',
    total_qty: 14,
    working_qty: 12,
    damaged_qty: 2,
    available_qty: 12,
    unit: 'pcs'
  },
  {
    id: 'inv-soil-cap',
    name: 'Capacitive Soil Moisture Sensor v1.2',
    category: 'Sensor',
    total_qty: 6,
    working_qty: 6,
    damaged_qty: 0,
    available_qty: 6,
    unit: 'pcs'
  },
  {
    id: 'inv-dht11',
    name: 'DHT11 / DHT22 Temperature & Humidity Sensor',
    category: 'Sensor',
    total_qty: 6,
    working_qty: 5,
    damaged_qty: 1,
    available_qty: 5,
    unit: 'pcs'
  },
  {
    id: 'inv-ldr',
    name: 'LDR (Light Dependent Resistor) Sensor',
    category: 'Sensor',
    total_qty: 20,
    working_qty: 20,
    damaged_qty: 0,
    available_qty: 20,
    unit: 'pcs'
  },
  {
    id: 'inv-rain',
    name: 'Raindrops Detection Sensor Module',
    category: 'Sensor',
    total_qty: 4,
    working_qty: 4,
    damaged_qty: 0,
    available_qty: 4,
    unit: 'pcs'
  },
  // Actuators & Drivers
  {
    id: 'inv-l298n',
    name: 'L298N Dual H-Bridge Motor Driver Module',
    category: 'Driver & Controller',
    total_qty: 8,
    working_qty: 7,
    damaged_qty: 1,
    available_qty: 7,
    unit: 'pcs'
  },
  {
    id: 'inv-bo-motors',
    name: 'BO Yellow Gear Motor (Dual Axis)',
    category: 'Actuator & Motor',
    total_qty: 16,
    working_qty: 14,
    damaged_qty: 2,
    available_qty: 14,
    unit: 'pcs'
  },
  {
    id: 'inv-sg90',
    name: 'SG90 9g Micro Servo Motor',
    category: 'Actuator & Motor',
    total_qty: 10,
    working_qty: 9,
    damaged_qty: 1,
    available_qty: 9,
    unit: 'pcs'
  },
  {
    id: 'inv-relay',
    name: '5V 1-Channel Relay Module (Optocoupler)',
    category: 'Driver & Controller',
    total_qty: 6,
    working_qty: 6,
    damaged_qty: 0,
    available_qty: 6,
    unit: 'pcs'
  },
  {
    id: 'inv-pump',
    name: 'Mini Submersible DC Water Pump (3V - 6V)',
    category: 'Actuator & Motor',
    total_qty: 4,
    working_qty: 4,
    damaged_qty: 0,
    available_qty: 4,
    unit: 'pcs'
  },
  {
    id: 'inv-pca9685',
    name: 'PCA9685 16-Channel 12-bit PWM Servo Driver',
    category: 'Driver & Controller',
    total_qty: 2,
    working_qty: 2,
    damaged_qty: 0,
    available_qty: 2,
    unit: 'pcs'
  },
  // Robotics Frame
  {
    id: 'inv-chassis',
    name: '2WD Smart Robot Car Chassis Kit',
    category: 'Robotics & Mechanical',
    total_qty: 6,
    working_qty: 5,
    damaged_qty: 1,
    available_qty: 5,
    unit: 'sets'
  },
  // Power & Batteries
  {
    id: 'inv-18650',
    name: '18650 Li-ion Rechargeable Battery (3.7V ~2500mAh)',
    category: 'Power & Battery',
    total_qty: 12,
    working_qty: 10,
    damaged_qty: 2,
    available_qty: 10,
    unit: 'cells'
  },
  {
    id: 'inv-9v',
    name: '9V Alkaline/Heavy Duty Battery + Snap Connector',
    category: 'Power & Battery',
    total_qty: 15,
    working_qty: 12,
    damaged_qty: 3,
    available_qty: 12,
    unit: 'pcs'
  },
  {
    id: 'inv-buck',
    name: 'DC-DC Buck Converter (5V Output Step-Down)',
    category: 'Driver & Controller',
    total_qty: 4,
    working_qty: 4,
    damaged_qty: 0,
    available_qty: 4,
    unit: 'pcs'
  },
  // Displays & Passives
  {
    id: 'inv-lcd',
    name: '16x2 Character LCD with I2C Module',
    category: 'Display & Communication',
    total_qty: 6,
    working_qty: 6,
    damaged_qty: 0,
    available_qty: 6,
    unit: 'pcs'
  },
  {
    id: 'inv-breadboard',
    name: 'Full-Size 830-Point Solderless Breadboard',
    category: 'Prototyping & Tools',
    total_qty: 15,
    working_qty: 14,
    damaged_qty: 1,
    available_qty: 14,
    unit: 'pcs'
  },
  {
    id: 'inv-ne555',
    name: 'NE555 Precision Timer IC',
    category: 'Passive & Semiconductor',
    total_qty: 20,
    working_qty: 20,
    damaged_qty: 0,
    available_qty: 20,
    unit: 'pcs'
  },
  {
    id: 'inv-l293d',
    name: 'L293D Quadruple Half-H Motor Driver IC',
    category: 'Driver & Controller',
    total_qty: 10,
    working_qty: 9,
    damaged_qty: 1,
    available_qty: 9,
    unit: 'pcs'
  },
  {
    id: 'inv-bc547',
    name: 'BC547 NPN Bipolar Junction Transistor',
    category: 'Passive & Semiconductor',
    total_qty: 30,
    working_qty: 30,
    damaged_qty: 0,
    available_qty: 30,
    unit: 'pcs'
  },
  {
    id: 'inv-diode',
    name: '1N4007 Rectifier Diode',
    category: 'Passive & Semiconductor',
    total_qty: 40,
    working_qty: 40,
    damaged_qty: 0,
    available_qty: 40,
    unit: 'pcs'
  },
  {
    id: 'inv-resistors',
    name: 'Resistor Assortment (220Ω - 1MΩ)',
    category: 'Passive & Semiconductor',
    total_qty: 300,
    working_qty: 300,
    damaged_qty: 0,
    available_qty: 300,
    unit: 'pcs'
  },
  {
    id: 'inv-leds',
    name: 'LED Assortment (3mm & 5mm Multi-color)',
    category: 'Passive & Semiconductor',
    total_qty: 150,
    working_qty: 140,
    damaged_qty: 10,
    available_qty: 140,
    unit: 'pcs'
  },
  // Lab Tools
  {
    id: 'inv-dmm',
    name: 'Digital Multimeter (DMM)',
    category: 'Prototyping & Tools',
    total_qty: 6,
    working_qty: 5,
    damaged_qty: 1,
    available_qty: 5,
    unit: 'units'
  },
  {
    id: 'inv-solder',
    name: 'Soldering Iron Kit (25W - 40W)',
    category: 'Prototyping & Tools',
    total_qty: 4,
    working_qty: 4,
    damaged_qty: 0,
    available_qty: 4,
    unit: 'sets'
  }
];

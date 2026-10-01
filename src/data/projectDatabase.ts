import { LabProject } from '../types/lab';

export const PROJECT_DATABASE: LabProject[] = [
  // 1. OBSTACLE AVOIDING ROBOT
  {
    id: 'obstacle-avoiding-robot',
    name: 'Autonomous Obstacle Avoiding Robot',
    project_type: 'UNIQUE_PROJECT',
    category: 'Robotics',
    difficulty: 'Intermediate',
    class_levels: [7, 8, 9, 10, 11, 12],
    objective: 'Construct a self-navigating wheeled robot vehicle that detects obstacles ahead using ultrasonic sound waves and automatically changes direction to prevent collisions.',
    problem_statement: 'Autonomous vehicles and warehouse delivery rovers must navigate dynamically changing environments without human intervention or physical crashes.',
    scientific_principle: 'Acoustic Time-of-Flight (ToF) echolocation for distance estimation and differential steering kinematics for path realignment.',
    required_components: [
      { component_name: 'Arduino UNO R3', quantity: 1, alternative_names: ['Arduino Uno', 'ATmega328P Uno'], is_essential: true },
      { component_name: 'L298N Dual H-Bridge Motor Driver Module', quantity: 1, alternative_names: ['L298N', 'Motor Driver Board'], is_essential: true },
      { component_name: 'HC-SR04 Ultrasonic Distance Sensor', quantity: 1, alternative_names: ['HC-SR04', 'Ultrasonic Sensor'], is_essential: true },
      { component_name: 'BO Yellow Gear Motor (Dual Axis)', quantity: 2, alternative_names: ['BO Motor', 'Yellow DC Motor'], is_essential: true },
      { component_name: '2WD Smart Robot Car Chassis Kit', quantity: 1, alternative_names: ['Robot Chassis', '2WD Chassis'], is_essential: true },
      { component_name: '18650 Li-ion Rechargeable Battery (3.7V ~2500mAh)', quantity: 2, alternative_names: ['18650 Cell', 'Li-ion Battery'], is_essential: true }
    ],
    working_explanation: 'The Arduino commands the HC-SR04 sensor to send a 10µs ultrasonic burst every 50ms. If the calculated obstacle distance is greater than 25cm, the Arduino commands the L298N driver to rotate both BO motors forward. When an obstacle is detected within 25cm, the robot halts, reverses briefly, turns right by spinning the left wheel forward and right wheel backward, and resumes forward motion once the path is clear.',
    block_diagram: {
      inputs: ['HC-SR04 Ultrasonic Sensor (Echo pulse timing)'],
      processing: ['Arduino UNO ATmega328P (Distance math & State Machine decision logic)'],
      outputs: ['L298N Motor Driver H-Bridges', 'Left BO Motor', 'Right BO Motor'],
      power: ['2x 18650 Li-ion Battery pack (7.4V) powering L298N and Arduino VIN']
    },
    circuit_connections: [
      { component: 'HC-SR04', pin: 'VCC', connection: 'Arduino 5V', notes: 'Sensor logic power' },
      { component: 'HC-SR04', pin: 'GND', connection: 'Arduino GND', notes: 'Common ground' },
      { component: 'HC-SR04', pin: 'TRIG', connection: 'Arduino Pin 9', notes: 'Trigger pulse output' },
      { component: 'HC-SR04', pin: 'ECHO', connection: 'Arduino Pin 10', notes: 'Echo pulse input' },
      { component: 'L298N', pin: 'IN1', connection: 'Arduino Pin 5', notes: 'Left Motor Direction 1' },
      { component: 'L298N', pin: 'IN2', connection: 'Arduino Pin 6', notes: 'Left Motor Direction 2' },
      { component: 'L298N', pin: 'IN3', connection: 'Arduino Pin 7', notes: 'Right Motor Direction 1' },
      { component: 'L298N', pin: 'IN4', connection: 'Arduino Pin 8', notes: 'Right Motor Direction 2' },
      { component: 'L298N', pin: '12V Terminal', connection: 'Battery Pack Positive (+) 7.4V', notes: 'High current motor power' },
      { component: 'L298N', pin: 'GND Terminal', connection: 'Battery (-) AND Arduino GND', notes: 'MANDATORY COMMON GROUND' },
      { component: 'Arduino', pin: 'VIN', connection: 'L298N 5V output (if jumper ON) or Battery (+)', notes: 'Regulated power to Arduino' }
    ],
    programming_board: 'Arduino UNO',
    code_language: 'C++',
    code_template: `// AI Science Lab Assistant - Obstacle Avoiding Robot
// Compatible with Arduino UNO + L298N + HC-SR04

const int TRIG_PIN = 9;
const int ECHO_PIN = 10;

// L298N Motor Pins
const int IN1 = 5; // Left Motor Forward
const int IN2 = 6; // Left Motor Backward
const int IN3 = 7; // Right Motor Forward
const int IN4 = 8; // Right Motor Backward

const int OBSTACLE_DISTANCE_CM = 25;

long measureDistanceCm() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  long duration = pulseIn(ECHO_PIN, HIGH, 30000); // 30ms timeout (~5m max)
  if (duration == 0) return 999; // Clear path or out of range
  return (duration * 0.0343) / 2;
}

void moveForward() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
}

void moveBackward() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
}

void turnRight() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
}

void stopRobot() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
}

void setup() {
  Serial.begin(9600);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);
  
  stopRobot();
  Serial.println(F("Obstacle Avoiding Robot Initialized. Starting in 2s..."));
  delay(2000);
}

void loop() {
  long distance = measureDistanceCm();
  Serial.print(F("Distance: "));
  Serial.print(distance);
  Serial.println(F(" cm"));
  
  if (distance < OBSTACLE_DISTANCE_CM) {
    Serial.println(F("Obstacle Detected! Stopping and turning..."));
    stopRobot();
    delay(200);
    moveBackward();
    delay(400);
    stopRobot();
    delay(200);
    turnRight();
    delay(500);
    stopRobot();
    delay(200);
  } else {
    moveForward();
  }
  delay(50);
}`,
    required_libraries: ['None (Uses standard Arduino core functions)'],
    expected_output: 'When powered, the robot drives forward in a straight line. When placed in front of a wall or hand at ~25cm, it immediately stops, reverses 10cm, turns right ~90 degrees, and continues forward.',
    troubleshooting: [
      {
        issue: 'Robot spins in circles instead of moving straight',
        cause: 'One motor wiring polarity is inverted compared to the other.',
        solution: 'Swap the two wires of the backwards motor at the L298N screw terminal.'
      },
      {
        issue: 'Arduino resets or turns off when motors turn on',
        cause: 'Brownout reset caused by powering motors from the Arduino 5V pin or dead battery.',
        solution: 'Power motors from the dedicated 18650 pack via L298N terminal. Ensure battery is charged.'
      },
      {
        issue: 'Sensor always reports 0 cm or 999 cm',
        cause: 'TRIG and ECHO swapped or disconnected.',
        solution: 'Check that TRIG connects to Pin 9 and ECHO connects to Pin 10.'
      }
    ],
    safety_precautions: [
      'COMMON GROUND: Always connect the battery negative (-) lead to both L298N GND and Arduino GND.',
      'NEVER attempt to run BO gear motors directly off the Arduino 5V pin; motors draw up to 1A during stall.',
      'Elevate the robot chassis on a coffee cup during testing so wheels can spin freely in the air.'
    ],
    real_life_applications: [
      'Autonomous vacuum cleaners (e.g. iRobot Roomba)',
      'Automated Guided Vehicles (AGVs) in Amazon fulfillment warehouses',
      'Autonomous planetary exploration rovers on the Moon and Mars'
    ],
    future_improvements: [
      'Mount the HC-SR04 on an SG90 servo motor to scan left, center, and right before choosing the clearest turn direction.',
      'Add speed control via PWM using L298N ENA and ENB pins.'
    ],
    viva_questions: [
      {
        question: 'What is the physical principle behind the HC-SR04 distance measurement?',
        answer: 'It uses acoustic Time-of-Flight (ToF). High frequency (40kHz) sound is transmitted, bounces off the target, and returns. Distance = (Travel Time × Speed of Sound) / 2.'
      },
      {
        question: 'Why do we divide the travel time calculation by 2?',
        answer: 'Because the sound wave makes a round trip—traveling from the sensor to the obstacle and then bouncing back.'
      },
      {
        question: 'Why can we not power the motors directly from Arduino GPIO pins?',
        answer: 'An Arduino GPIO pin can safely provide a maximum of 20mA. BO gear motors require 150mA to 800mA stall current. Connecting directly would instantly destroy the microcontroller chip.'
      },
      {
        question: 'What is the function of the L298N motor driver?',
        answer: 'It acts as an H-bridge power amplifier. It takes low-power 5V logic signals from the microcontroller and switches high-power current from an external battery to the motors in both directions.'
      },
      {
        question: 'What happens if we forget to connect the battery ground to the Arduino ground?',
        answer: 'There will be no common electrical reference potential. The logic signals will fluctuate unpredictably, causing motors to stutter, fail to start, or behave erratically.'
      }
    ]
  },

  // 2. LINE FOLLOWER ROBOT
  {
    id: 'line-follower-robot',
    name: 'Smart Optical Line Follower Robot',
    project_type: 'UNIQUE_PROJECT',
    category: 'Robotics',
    difficulty: 'Intermediate',
    class_levels: [7, 8, 9, 10, 11, 12],
    objective: 'Build an autonomous mobile robot that detects and precisely tracks a black track on a white background using infrared reflectance sensors.',
    problem_statement: 'Industrial factory logistics require automated carts to transport parts between workstations reliably along marked navigation floor paths.',
    scientific_principle: 'Infrared differential reflectance: Dark matte surfaces absorb infrared wavelengths while light surfaces reflect them back to photodetectors.',
    required_components: [
      { component_name: 'Arduino UNO R3', quantity: 1, alternative_names: ['Arduino Uno'], is_essential: true },
      { component_name: 'L298N Dual H-Bridge Motor Driver Module', quantity: 1, alternative_names: ['L298N'], is_essential: true },
      { component_name: 'IR Line Tracking Sensor Module', quantity: 2, alternative_names: ['IR Line Sensor', 'TCRT5000 Module'], is_essential: true },
      { component_name: 'BO Yellow Gear Motor (Dual Axis)', quantity: 2, alternative_names: ['BO Motor'], is_essential: true },
      { component_name: '2WD Smart Robot Car Chassis Kit', quantity: 1, alternative_names: ['Robot Chassis'], is_essential: true },
      { component_name: '18650 Li-ion Rechargeable Battery (3.7V ~2500mAh)', quantity: 2, alternative_names: ['18650 Cell'], is_essential: true }
    ],
    working_explanation: 'Two infrared line sensors are mounted ~1cm above the ground on the left and right front of the chassis. When both sensors detect white (reflection HIGH/LOW depending on module), the robot drives straight forward. If the left sensor detects black tape, the robot veers right to recenter. If the right sensor detects black tape, it veers left. If both detect black (intersection or finish line), it halts.',
    block_diagram: {
      inputs: ['Left IR Reflectance Sensor', 'Right IR Reflectance Sensor'],
      processing: ['Arduino UNO (Differential line tracking logic)'],
      outputs: ['L298N Motor Driver', 'Left Motor', 'Right Motor'],
      power: ['7.4V Li-ion Battery with Common Ground']
    },
    circuit_connections: [
      { component: 'Left IR Sensor', pin: 'VCC', connection: 'Arduino 5V', notes: 'Power' },
      { component: 'Left IR Sensor', pin: 'GND', connection: 'Arduino GND', notes: 'Ground' },
      { component: 'Left IR Sensor', pin: 'D0', connection: 'Arduino Pin 2', notes: 'Left Line Sensor digital signal' },
      { component: 'Right IR Sensor', pin: 'VCC', connection: 'Arduino 5V', notes: 'Power' },
      { component: 'Right IR Sensor', pin: 'GND', connection: 'Arduino GND', notes: 'Ground' },
      { component: 'Right IR Sensor', pin: 'D0', connection: 'Arduino Pin 3', notes: 'Right Line Sensor digital signal' },
      { component: 'L298N', pin: 'IN1', connection: 'Arduino Pin 5', notes: 'Left Motor Fwd' },
      { component: 'L298N', pin: 'IN2', connection: 'Arduino Pin 6', notes: 'Left Motor Rev' },
      { component: 'L298N', pin: 'IN3', connection: 'Arduino Pin 7', notes: 'Right Motor Fwd' },
      { component: 'L298N', pin: 'IN4', connection: 'Arduino Pin 8', notes: 'Right Motor Rev' },
      { component: 'L298N', pin: 'GND', connection: 'Battery (-) & Arduino GND', notes: 'Common Ground' }
    ],
    programming_board: 'Arduino UNO',
    code_language: 'C++',
    code_template: `// AI Science Lab Assistant - Optical Line Follower Robot
// Left Sensor: Pin 2, Right Sensor: Pin 3
// L298N: IN1=5, IN2=6, IN3=7, IN4=8

const int LEFT_IR = 2;
const int RIGHT_IR = 3;

const int IN1 = 5;
const int IN2 = 6;
const int IN3 = 7;
const int IN4 = 8;

// Adjust depending on module: typically LOW on white, HIGH on black line
#define BLACK_LINE HIGH
#define WHITE_FLOOR LOW

void moveForward() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
}

void turnLeft() {
  // Stop left motor, spin right motor
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
}

void turnRight() {
  // Spin left motor, stop right motor
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
}

void stopRobot() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
}

void setup() {
  pinMode(LEFT_IR, INPUT);
  pinMode(RIGHT_IR, INPUT);
  
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);
  
  stopRobot();
  delay(1000);
}

void loop() {
  int leftVal = digitalRead(LEFT_IR);
  int rightVal = digitalRead(RIGHT_IR);
  
  // Case 1: Both on white -> move straight
  if (leftVal == WHITE_FLOOR && rightVal == WHITE_FLOOR) {
    moveForward();
  }
  // Case 2: Left detected black line -> steer left
  else if (leftVal == BLACK_LINE && rightVal == WHITE_FLOOR) {
    turnLeft();
  }
  // Case 3: Right detected black line -> steer right
  else if (leftVal == WHITE_FLOOR && rightVal == BLACK_LINE) {
    turnRight();
  }
  // Case 4: Both on black (Cross track / finish) -> stop
  else {
    stopRobot();
  }
  delay(10);
}`,
    required_libraries: ['None'],
    expected_output: 'The robot smoothly tracks along a black electrical tape line laid out on a light tile or posterboard surface, steering around curves with micro-corrections.',
    troubleshooting: [
      {
        issue: 'Robot does not detect the black tape at all',
        cause: 'Sensitivity potentiometer on IR module not calibrated for ambient lighting.',
        solution: 'Use a small flathead screwdriver to turn the blue trimmer pot until the onboard D0 LED flips state when moved over the tape.'
      },
      {
        issue: 'Robot steers away from the line instead of into it',
        cause: 'Left and Right IR sensor pins swapped in code or wiring.',
        solution: 'Swap Pin 2 and Pin 3 connections.'
      }
    ],
    safety_precautions: [
      'Maintain sensor clearance of 5mm to 10mm above the floor. If too high, reflection is lost.',
      'Check common ground between L298N and Arduino.'
    ],
    real_life_applications: [
      'Hospital material delivery robots',
      'Automated manufacturing assembly line guidance',
      'Port container logistics'
    ],
    future_improvements: [
      'Implement PID (Proportional-Integral-Derivative) control for high-speed racing without oscillations.',
      'Add a third center sensor for sharper 90-degree corner handling.'
    ],
    viva_questions: [
      {
        question: 'Why does black electrical tape reflect less infrared than white paper?',
        answer: 'Black carbon-based pigments absorb electromagnetic radiation in both visible and near-infrared spectra, whereas white surfaces scatter and diffuse-reflect most IR wavelengths.'
      },
      {
        question: 'What is the role of the LM393 comparator on the IR module?',
        answer: 'It compares the analog voltage from the phototransistor against a reference voltage set by the potentiometer, outputting a crisp digital 0V (LOW) or 5V (HIGH).'
      },
      {
        question: 'How does differential steering allow a 2-wheel robot to turn?',
        answer: 'By creating a velocity difference between the left and right wheels: slowing or stopping one wheel causes the vehicle to pivot around that stationary wheel.'
      },
      {
        question: 'What is the advantage of using infrared light over visible light for line following?',
        answer: 'IR is invisible to human eyes and when modulated or filtered can minimize interference from ambient room lighting.'
      },
      {
        question: 'What happens if sunlight shines directly on the floor track?',
        answer: 'Sunlight contains strong ambient infrared radiation that can saturate the phototransistor, causing the sensor to falsely read white surfaces everywhere.'
      }
    ]
  },

  // 3. AUTOMATIC PLANT WATERING / SMART SOIL IRRIGATION SYSTEM
  {
    id: 'smart-soil-irrigation',
    name: 'Automatic Plant Watering & Smart Irrigation System',
    project_type: 'UNIQUE_PROJECT',
    category: 'Smart Agriculture',
    difficulty: 'Intermediate',
    class_levels: [6, 7, 8, 9, 10, 11, 12],
    objective: 'Design an automated, closed-loop smart irrigation system that monitors soil moisture levels in real-time and dispenses water via a mini submersible pump through relay switching.',
    problem_statement: 'Over-watering and drought cause massive agricultural crop loss and domestic houseplant death. A system is needed to water plants only when their roots actually need it.',
    scientific_principle: 'Capacitive dielectric moisture sensing and electromagnetic relay switching for high-current hydraulic actuation.',
    required_components: [
      { component_name: 'Arduino UNO R3', quantity: 1, alternative_names: ['Arduino Uno', 'ESP32 Development Board'], is_essential: true },
      { component_name: 'Capacitive Soil Moisture Sensor v1.2', quantity: 1, alternative_names: ['Soil Moisture Sensor'], is_essential: true },
      { component_name: '5V 1-Channel Relay Module (Optocoupler)', quantity: 1, alternative_names: ['5V Relay', 'Relay Module'], is_essential: true },
      { component_name: 'Mini Submersible DC Water Pump (3V - 6V)', quantity: 1, alternative_names: ['Water Pump', 'Mini Water Pump'], is_essential: true },
      { component_name: 'Full-Size 830-Point Solderless Breadboard', quantity: 1, alternative_names: ['Breadboard'], is_essential: true }
    ],
    working_explanation: 'The capacitive soil moisture probe outputs an analog voltage proportional to soil water content. In dry soil, the reading is high (~650-800 on 10-bit ADC). In moist soil, it drops (~350-500). When the Arduino detects dry soil exceeding the threshold for 3 consecutive seconds, it switches the 5V relay ON (active LOW). The relay closes an external 5V circuit to power the submersible pump for 5 seconds, pumping water directly to the plant roots, and then rests.',
    block_diagram: {
      inputs: ['Capacitive Soil Moisture Probe (Dielectric Analog Voltage)'],
      processing: ['Arduino UNO ADC & Moisture Calculation Algorithm'],
      outputs: ['5V Optocoupled Relay Module', 'Mini DC Water Pump', 'Status LED / Serial Log'],
      power: ['USB 5V for Arduino and separate 5V 1A adapter/battery for Water Pump']
    },
    circuit_connections: [
      { component: 'Capacitive Moisture Sensor', pin: 'VCC', connection: 'Arduino 5V', notes: 'Probe power' },
      { component: 'Capacitive Moisture Sensor', pin: 'GND', connection: 'Arduino GND', notes: 'Common ground' },
      { component: 'Capacitive Moisture Sensor', pin: 'AOUT', connection: 'Arduino Pin A0', notes: 'Analog moisture reading' },
      { component: 'Relay Module', pin: 'VCC', connection: 'Arduino 5V', notes: 'Relay coil power' },
      { component: 'Relay Module', pin: 'GND', connection: 'Arduino GND', notes: 'Relay coil ground' },
      { component: 'Relay Module', pin: 'IN', connection: 'Arduino Pin 7', notes: 'Active-LOW trigger' },
      { component: 'Relay Module', pin: 'COM', connection: 'External 5V Power (+)', notes: 'High power switch input' },
      { component: 'Relay Module', pin: 'NO (Normally Open)', connection: 'Water Pump Red (+) Wire', notes: 'Switched power to pump' },
      { component: 'Water Pump', pin: 'Black (-) Wire', connection: 'External Power GND', notes: 'Pump ground return' }
    ],
    programming_board: 'Arduino UNO',
    code_language: 'C++',
    code_template: `// AI Science Lab Assistant - Automatic Plant Watering System
// Arduino UNO + Capacitive Moisture Sensor v1.2 + 5V Relay + Mini Pump

const int MOISTURE_PIN = A0;
const int RELAY_PIN = 7;

// Calibration values (Calibrate in dry air and water cup)
const int DRY_THRESHOLD = 600;   // Above this = soil is thirsty
const int WET_THRESHOLD = 400;   // Below this = soil is well-watered

const int WATERING_DURATION_MS = 4000; // Run pump for 4 seconds
const int POST_WATER_WAIT_MS = 10000;  // Wait 10s for water to soak roots

void setup() {
  Serial.begin(9600);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, HIGH); // Relay OFF (Active LOW module)
  
  Serial.println(F("========================================"));
  Serial.println(F("  AUTOMATIC SMART PLANT WATERING SYSTEM "));
  Serial.println(F("========================================"));
}

void loop() {
  int rawValue = analogRead(MOISTURE_PIN);
  
  // Calculate approximate percentage (0% = totally dry, 100% = fully saturated)
  int moisturePercent = map(rawValue, 700, 350, 0, 100);
  moisturePercent = constrain(moisturePercent, 0, 100);
  
  Serial.print(F("Soil ADC: "));
  Serial.print(rawValue);
  Serial.print(F(" | Moisture: "));
  Serial.print(moisturePercent);
  Serial.println(F("%"));
  
  if (rawValue > DRY_THRESHOLD) {
    Serial.println(F(">> SOIL IS DRY! Activating Irrigation Pump..."));
    digitalWrite(RELAY_PIN, LOW); // Relay ON
    delay(WATERING_DURATION_MS);
    
    digitalWrite(RELAY_PIN, HIGH); // Relay OFF
    Serial.println(F(">> Pump Deactivated. Waiting for water to soak..."));
    delay(POST_WATER_WAIT_MS);
  } else {
    Serial.println(F(">> Soil moisture is adequate. No watering needed."));
    delay(2000);
  }
}`,
    required_libraries: ['None'],
    expected_output: 'When the probe is in dry air or dry soil, Serial Monitor prints "SOIL IS DRY", the relay clicks, its green LED illuminates, and the pump runs for 4 seconds. When inserted into moist potting soil, the pump remains safely off.',
    troubleshooting: [
      {
        issue: 'Pump runs continuously even when in water',
        cause: 'Threshold set too low or Relay polarity inverted (some relays are Active-HIGH, others Active-LOW).',
        solution: 'Check your relay module behavior. If the relay turns on when pin is HIGH, invert digitalWrite logic.'
      },
      {
        issue: 'Arduino reboots every time the relay clicks',
        cause: 'Inductive kickback or pump current dragging down the Arduino 5V rail.',
        solution: 'Power the pump from an independent 5V power supply or battery pack, NOT the Arduino 5V pin.'
      }
    ],
    safety_precautions: [
      'WATER SAFETY: Keep all electronic boards (Arduino, Relay) in a dry box elevated away from the water reservoir.',
      'NEVER submerge the top electronic header of the capacitive sensor probe into water.',
      'DO NOT connect the water pump directly to an Arduino GPIO pin (GPIO limit: 20mA, pump requires 250mA).'
    ],
    real_life_applications: [
      'Precision drip agriculture (reducing water consumption by 50%)',
      'Smart greenhouses and rooftop gardens',
      'Autonomous hydroponic nutrient dosing'
    ],
    future_improvements: [
      'Add a 16x2 I2C LCD to show live soil moisture percentages on the pot.',
      'Add an ESP32 to send push notifications to a smartphone when the water reservoir is empty.'
    ],
    viva_questions: [
      {
        question: 'Why is a capacitive soil moisture sensor superior to a cheap resistive soil probe?',
        answer: 'Resistive probes pass DC current through bare copper tines directly in the soil, which triggers rapid electrolysis and causes the copper to oxidize and corrode away in weeks. Capacitive sensors insulate the copper traces inside the PCB, measuring electric fields with zero electrolysis.'
      },
      {
        question: 'How does water in soil change the sensor\'s capacitance?',
        answer: 'The relative dielectric constant of dry soil and air is between 1 and 4, whereas pure water has a very high dielectric constant of ~80. As water fills air pores in the soil, overall capacitance increases, which alters the internal 555 oscillator frequency.'
      },
      {
        question: 'Why is an optocoupler included on the relay module?',
        answer: 'An optocoupler transmits the control signal using light (an internal infrared LED shining on a phototransistor), providing complete galvanic electrical isolation between the sensitive microcontroller and the noisy motor circuit.'
      },
      {
        question: 'What is flyback voltage, and why does an inductive pump require protection?',
        answer: 'When current to a motor coil is abruptly switched off, the collapsing magnetic field induces a reverse high-voltage spike (Faraday\'s Law: V = -L(di/dt)) that can arc across contacts or punch through transistors unless caught by a diode or snubber.'
      },
      {
        question: 'What does "Normally Open" (NO) on a relay mean?',
        answer: 'It means the circuit contacts are physically disconnected (open) when the relay coil is unpowered. Current only flows when the microcontroller actively energizes the relay.'
      }
    ]
  },

  // 4. ULTRASONIC RADAR PROTOTYPE
  {
    id: 'ultrasonic-radar-scanner',
    name: '360° / 180° Ultrasonic Radar Scanning System',
    project_type: 'UNIQUE_PROJECT',
    category: 'Sensors',
    difficulty: 'Intermediate',
    class_levels: [8, 9, 10, 11, 12],
    objective: 'Build an active rotating sonar radar station using an HC-SR04 mounted on an SG90 servo motor, mapping objects within a 180-degree sweep.',
    problem_statement: 'Static distance sensors only see directly ahead in a narrow cone; security and navigation systems require wide angular awareness.',
    scientific_principle: 'Polar coordinate spatial mapping (r, θ) combining angular servo position with acoustic time-of-flight ranging.',
    required_components: [
      { component_name: 'Arduino UNO R3', quantity: 1, alternative_names: ['Arduino Uno'], is_essential: true },
      { component_name: 'HC-SR04 Ultrasonic Distance Sensor', quantity: 1, alternative_names: ['HC-SR04'], is_essential: true },
      { component_name: 'SG90 9g Micro Servo Motor', quantity: 1, alternative_names: ['SG90', '9g Servo'], is_essential: true },
      { component_name: 'Full-Size 830-Point Solderless Breadboard', quantity: 1, alternative_names: ['Breadboard'], is_essential: true }
    ],
    working_explanation: 'The SG90 servo motor sweeps incrementally from 15° to 165° in 1-degree steps. At each angle, the Arduino triggers the HC-SR04 ultrasonic sensor, records the distance, and streams the data in the format `angle,distance.` over the USB Serial port, capable of plotting a real-time radar screen.',
    block_diagram: {
      inputs: ['HC-SR04 Echo Pulses'],
      processing: ['Arduino UNO (Angle Sweep Coordinator & Distance Calculation)'],
      outputs: ['SG90 Servo PWM signal', 'Serial Monitor Data Stream (angle, distance)'],
      power: ['USB 5V or external 5V supply']
    },
    circuit_connections: [
      { component: 'SG90 Servo', pin: 'Red Wire', connection: 'Arduino 5V', notes: 'Servo VCC' },
      { component: 'SG90 Servo', pin: 'Brown Wire', connection: 'Arduino GND', notes: 'Ground' },
      { component: 'SG90 Servo', pin: 'Orange Wire', connection: 'Arduino Pin 11', notes: 'PWM Control' },
      { component: 'HC-SR04', pin: 'VCC', connection: 'Arduino 5V', notes: 'Power' },
      { component: 'HC-SR04', pin: 'GND', connection: 'Arduino GND', notes: 'Ground' },
      { component: 'HC-SR04', pin: 'TRIG', connection: 'Arduino Pin 9', notes: 'Trigger' },
      { component: 'HC-SR04', pin: 'ECHO', connection: 'Arduino Pin 10', notes: 'Echo' }
    ],
    programming_board: 'Arduino UNO',
    code_language: 'C++',
    code_template: `// AI Science Lab Assistant - Ultrasonic Radar Scanner
#include <Servo.h>

const int TRIG_PIN = 9;
const int ECHO_PIN = 10;
const int SERVO_PIN = 11;

Servo radarServo;

long getDistance() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  long duration = pulseIn(ECHO_PIN, HIGH, 25000);
  if (duration == 0) return 400; // max range
  return (duration * 0.034) / 2;
}

void setup() {
  Serial.begin(9600);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  
  radarServo.attach(SERVO_PIN);
  Serial.println(F("Radar System Initialized. Sweeping 15 to 165 degrees..."));
}

void loop() {
  // Sweep from 15 to 165 degrees
  for (int angle = 15; angle <= 165; angle += 2) {
    radarServo.write(angle);
    delay(30);
    long dist = getDistance();
    Serial.print(angle);
    Serial.print(F(","));
    Serial.print(dist);
    Serial.println(F("."));
  }
  // Sweep back
  for (int angle = 165; angle >= 15; angle -= 2) {
    radarServo.write(angle);
    delay(30);
    long dist = getDistance();
    Serial.print(angle);
    Serial.print(F(","));
    Serial.print(dist);
    Serial.println(F("."));
  }
}`,
    required_libraries: ['Servo.h (built into Arduino IDE)'],
    expected_output: 'The servo swings the sensor smoothly back and forth like a radar dish. In the Serial Monitor, pairs of angles and distances stream continuously: e.g. "90,32." means at 90 degrees forward an object is 32cm away.',
    troubleshooting: [
      {
        issue: 'Servo twitches and Arduino disconnects from USB',
        cause: 'Servo current spike during rapid reversal overloads the USB port 500mA limit.',
        solution: 'Add a 470µF electrolytic capacitor across 5V and GND on the breadboard, or power servo from external 5V.'
      }
    ],
    safety_precautions: [
      'Do not force the servo horn by hand while the motor is powered.',
      'Mount the ultrasonic sensor securely to the servo arm using a light sunboard or hot-glue bracket.'
    ],
    real_life_applications: [
      'Airport air traffic control radar',
      'Submarine active sonar navigation',
      'Automotive blind-spot detection and automatic parking'
    ],
    future_improvements: [
      'Connect with a Processing IDE script to draw a glowing green military radar sweep display on a PC screen.',
      'Sound an alarm when any object enters a 20cm perimeter.'
    ],
    viva_questions: [
      {
        question: 'What is the coordinate system used in radar representations?',
        answer: 'Polar coordinates (r, θ), where r represents the radial distance to the target and θ represents the azimuth angle from reference.'
      },
      {
        question: 'How is an RC hobby servo controlled?',
        answer: 'Using a 50Hz PWM signal where pulse width determines angle (typically 1ms for 0°, 1.5ms for 90°, and 2ms for 180°).'
      },
      {
        question: 'What is the beam angle of the HC-SR04?',
        answer: 'Approximately 15 degrees conical beam angle.'
      },
      {
        question: 'Why does sound travel faster in water than in air?',
        answer: 'Because water has a much higher bulk modulus (stiffness) and density, allowing acoustic pressure waves to propagate at ~1500 m/s compared to ~343 m/s in air.'
      },
      {
        question: 'What is RADAR an acronym for?',
        answer: 'RAdio Detection And Ranging (or in this acoustic case, SONAR: SOund Navigation And Ranging).'
      }
    ]
  },

  // 5. SMART WEATHER & ENVIRONMENT STATION (ESP32 / LCD / DHT)
  {
    id: 'esp32-weather-station',
    name: 'IoT Environmental & Weather Station',
    project_type: 'UNIQUE_PROJECT',
    category: 'IoT',
    difficulty: 'Intermediate',
    class_levels: [8, 9, 10, 11, 12],
    objective: 'Build an IoT meteorological station that logs ambient temperature, relative humidity, light level, and rain status, displaying data locally on an I2C LCD and broadcasting via web server.',
    problem_statement: 'Local microclimates vary significantly; farmers and schools require localized, high-resolution environmental data for agricultural planning.',
    scientific_principle: 'Sorption hygrometry, negative temperature coefficient thermistors, and HTTP REST web server communication over 2.4GHz 802.11b/g/n Wi-Fi.',
    required_components: [
      { component_name: 'ESP32 Development Board', quantity: 1, alternative_names: ['ESP-WROOM-32', 'Arduino UNO R3'], is_essential: true },
      { component_name: 'DHT11 / DHT22 Temperature & Humidity Sensor', quantity: 1, alternative_names: ['DHT11', 'DHT22'], is_essential: true },
      { component_name: 'LDR (Light Dependent Resistor) Sensor', quantity: 1, alternative_names: ['LDR', 'Photoresistor'], is_essential: true },
      { component_name: '16x2 Character LCD with I2C Module', quantity: 1, alternative_names: ['16x2 LCD', 'I2C LCD'], is_essential: true },
      { component_name: 'Full-Size 830-Point Solderless Breadboard', quantity: 1, alternative_names: ['Breadboard'], is_essential: true }
    ],
    working_explanation: 'The ESP32 samples temperature and humidity from the DHT sensor every 2 seconds and reads ambient lux via the LDR voltage divider on analog pin 34. The data is formatted and presented on the 16x2 I2C character LCD screen and simultaneously published on a responsive web page hosted directly on the ESP32 Wi-Fi server.',
    block_diagram: {
      inputs: ['DHT11 Digital 1-wire', 'LDR Analog Voltage (GPIO34)'],
      processing: ['ESP32 Dual-Core CPU (Sensor decoding, Web Server host)'],
      outputs: ['16x2 I2C LCD (PCF8574 address 0x27)', 'Local Wi-Fi Web Dashboard'],
      power: ['Micro-USB 5V (regulated to 3.3V on-board)']
    },
    circuit_connections: [
      { component: 'DHT11', pin: 'VCC', connection: 'ESP32 3V3', notes: 'Sensor Power' },
      { component: 'DHT11', pin: 'DATA', connection: 'ESP32 GPIO4', notes: 'Digital 1-wire data' },
      { component: 'DHT11', pin: 'GND', connection: 'ESP32 GND', notes: 'Ground' },
      { component: 'LDR (with 10k resistor)', pin: 'Divider Junction', connection: 'ESP32 GPIO34', notes: 'Analog light input' },
      { component: '16x2 I2C LCD', pin: 'VCC', connection: 'ESP32 VIN (5V)', notes: 'LCD backlight power' },
      { component: '16x2 I2C LCD', pin: 'GND', connection: 'ESP32 GND', notes: 'Ground' },
      { component: '16x2 I2C LCD', pin: 'SDA', connection: 'ESP32 GPIO21', notes: 'I2C Data' },
      { component: '16x2 I2C LCD', pin: 'SCL', connection: 'ESP32 GPIO22', notes: 'I2C Clock' }
    ],
    programming_board: 'ESP32',
    code_language: 'C++',
    code_template: `// AI Science Lab Assistant - IoT Weather Station
#include <WiFi.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include "DHT.h"

#define DHTPIN 4
#define DHTTYPE DHT11
#define LDRPIN 34

DHT dht(DHTPIN, DHTTYPE);
LiquidCrystal_I2C lcd(0x27, 16, 2);

const char* ssid = "LAB_WIFI_NAME";
const char* password = "LAB_PASSWORD";
WiFiServer server(80);

void setup() {
  Serial.begin(115200);
  dht.begin();
  
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Weather Station");
  lcd.setCursor(0, 1);
  lcd.print("Connecting WiFi");
  
  WiFi.begin(ssid, password);
  int tries = 0;
  while (WiFi.status() != WL_CONNECTED && tries < 15) {
    delay(500);
    Serial.print(".");
    tries++;
  }
  
  lcd.clear();
  if (WiFi.status() == WL_CONNECTED) {
    server.begin();
    lcd.setCursor(0, 0);
    lcd.print("IP: ");
    lcd.print(WiFi.localIP());
    delay(2000);
  } else {
    lcd.print("Offline Mode");
    delay(1000);
  }
}

void loop() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  int light = analogRead(LDRPIN);
  
  if (isnan(h) || isnan(t)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }
  
  // Update LCD
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Temp: ");
  lcd.print(t, 1);
  lcd.print("C");
  lcd.setCursor(0, 1);
  lcd.print("Hum: ");
  lcd.print(h, 0);
  lcd.print("% Ldr:");
  lcd.print(map(light, 0, 4095, 0, 100));
  lcd.print("%");
  
  // Handle Web Client if connected
  WiFiClient client = server.available();
  if (client) {
    String currentLine = "";
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        if (c == '\\n') {
          if (currentLine.length() == 0) {
            client.println("HTTP/1.1 200 OK");
            client.println("Content-type:text/html");
            client.println();
            client.println("<!DOCTYPE html><html><head><title>Lab Weather Station</title></head>");
            client.println("<body style='font-family:sans-serif;text-align:center;padding:2rem;'>");
            client.println("<h1>Lab IoT Environmental Monitor</h1>");
            client.print("<p style='font-size:1.5rem;'><b>Temperature:</b> ");
            client.print(t);
            client.println(" &deg;C</p>");
            client.print("<p style='font-size:1.5rem;'><b>Humidity:</b> ");
            client.print(h);
            client.println(" %</p>");
            client.println("</body></html>");
            break;
          } else {
            currentLine = "";
          }
        } else if (c != '\\r') {
          currentLine += c;
        }
      }
    }
    client.stop();
  }
  
  delay(2000);
}`,
    required_libraries: ['DHT sensor library by Adafruit', 'LiquidCrystal_I2C by Frank de Brabander'],
    expected_output: 'The 16x2 LCD displays live temperature and humidity refreshed every 2 seconds. Any phone or laptop connected to the same Wi-Fi can navigate to the printed IP address to view the web dashboard.',
    troubleshooting: [
      {
        issue: 'LCD displays black blocks or no text',
        cause: 'I2C contrast potentiometer not adjusted or incorrect I2C address.',
        solution: 'Turn the contrast trimmer pot on the back of the LCD. If address 0x27 fails, try 0x3F.'
      }
    ],
    safety_precautions: [
      'DO NOT supply 5V to the ESP32 GPIO pins; they are only 3.3V tolerant.',
      'Power the LCD VCC from 5V (or VIN) so its characters have high optical contrast.'
    ],
    real_life_applications: [
      'Smart HVAC climate control in energy-efficient buildings',
      'Server room temperature warning systems',
      'Precision agriculture weather stations'
    ],
    future_improvements: [
      'Send data to a free cloud dashboard like ThingSpeak or Adafruit IO for historical trend graphing.',
      'Add a capacitive soil probe and rain sensor for an all-in-one smart farm node.'
    ],
    viva_questions: [
      {
        question: 'What is the difference between DHT11 and DHT22?',
        answer: 'DHT11 measures 0 to 50°C (±2°C) and 20-90% RH (±5%). DHT22 has higher accuracy (±0.5°C), wider range (-40 to +80°C and 0-100% RH), but costs slightly more.'
      },
      {
        question: 'Why does the ESP32 have built-in Wi-Fi while Arduino Uno does not?',
        answer: 'The ESP32 is built on a modern SoC (System on a Chip) by Espressif that integrates 2.4GHz RF radios directly on silicon, whereas the classic ATmega328P is a simpler 8-bit microcontroller designed before IoT.'
      },
      {
        question: 'What communication protocol does the 16x2 LCD module backpack use?',
        answer: 'I2C (Inter-Integrated Circuit), which requires only two communication lines: SDA (Serial Data) and SCL (Serial Clock).'
      },
      {
        question: 'What is the purpose of an analog pull-down resistor with an LDR?',
        answer: 'It creates a voltage divider. An LDR changes resistance, but microcontrollers measure voltage; the divider converts changing resistance into a measurable analog voltage according to Vout = Vcc × (R / (R + R_ldr)).'
      },
      {
        question: 'What is relative humidity?',
        answer: 'The ratio of the current absolute amount of water vapor in the air to the maximum amount of water vapor that air can hold at that specific temperature, expressed as a percentage.'
      }
    ]
  },

  // 6. NE555 ASTABLE LED FLASHER / POLICE SIREN (DISCRETE ELECTRONICS)
  {
    id: 'ne555-astable-flasher',
    name: 'NE555 Dual LED Astable Multivibrator Flasher',
    project_type: 'EXPERIMENT',
    category: 'Electronics',
    difficulty: 'Beginner',
    class_levels: [6, 7, 8, 9, 10, 11, 12],
    objective: 'Construct a dual alternating LED flasher without any computer programming, understanding RC time constants and electronic oscillation.',
    problem_statement: 'Students need to understand how electronic timing circuits work at the semiconductor level before moving to complex microcontrollers.',
    scientific_principle: 'Exponential capacitor charging and discharging through resistors (Tau = R × C) toggling an internal flip-flop between 1/3 VCC and 2/3 VCC thresholds.',
    required_components: [
      { component_name: 'NE555 Precision Timer IC', quantity: 1, alternative_names: ['555 Timer', 'NE555'], is_essential: true },
      { component_name: 'Resistor Assortment (220Ω - 1MΩ)', quantity: 4, alternative_names: ['Resistors'], is_essential: true },
      { component_name: 'LED Assortment (3mm & 5mm Multi-color)', quantity: 2, alternative_names: ['LEDs'], is_essential: true },
      { component_name: 'Full-Size 830-Point Solderless Breadboard', quantity: 1, alternative_names: ['Breadboard'], is_essential: true },
      { component_name: '9V Alkaline/Heavy Duty Battery + Snap Connector', quantity: 1, alternative_names: ['9V Battery'], is_essential: true }
    ],
    working_explanation: 'Resistors R1 (10kΩ) and R2 (47kΩ) along with capacitor C1 (10µF) determine the charging and discharging rates. C1 charges through R1 + R2 until reaching 2/3 VCC, which triggers Pin 6 (Threshold) to switch Pin 3 (Output) LOW and open Pin 7 (Discharge). C1 then discharges through R2 into Pin 7 until dropping to 1/3 VCC, which triggers Pin 2 to set Pin 3 HIGH again. This cycle repeats continuously, causing two LEDs to flash alternately.',
    block_diagram: {
      inputs: ['DC Voltage from 9V Battery'],
      processing: ['555 Internal Voltage Divider, Comparators & Flip-Flop'],
      outputs: ['Pin 3 Square Wave alternating between 9V and 0V'],
      power: ['9V Battery to Pin 8 (VCC) and Pin 1 (GND)']
    },
    circuit_connections: [
      { component: 'NE555', pin: 'Pin 1', connection: 'Battery GND (0V)', notes: 'Ground' },
      { component: 'NE555', pin: 'Pin 8', connection: 'Battery Positive (+9V)', notes: 'VCC power' },
      { component: 'NE555', pin: 'Pin 4 (Reset)', connection: 'Pin 8 (+9V)', notes: 'Tie high to prevent reset' },
      { component: 'NE555', pin: 'Pin 2 & Pin 6', connection: 'Jumpered together and to C1 (+)', notes: 'Trigger and Threshold joined' },
      { component: 'Resistor R1 (10kΩ)', pin: 'Leads', connection: 'Between Pin 8 (+9V) and Pin 7', notes: 'Charging resistor 1' },
      { component: 'Resistor R2 (47kΩ)', pin: 'Leads', connection: 'Between Pin 7 and Pin 6', notes: 'Charging/discharging resistor 2' },
      { component: 'Capacitor C1 (10µF)', pin: 'Negative (-)', connection: 'Battery GND', notes: 'Timing capacitor' },
      { component: 'LED 1 (Red)', pin: 'Anode via 330Ω', connection: 'Pin 8 (+9V)', notes: 'Cathode to Pin 3' },
      { component: 'LED 2 (Green)', pin: 'Anode via 330Ω', connection: 'Pin 3', notes: 'Cathode to GND' }
    ],
    programming_board: 'NE555 / Discrete',
    code_language: 'None (Hardware only)',
    code_template: `// NO CODE REQUIRED!
// This is a pure analog and mixed-signal semiconductor circuit.
// Frequency calculation formula:
// Frequency f = 1.44 / ((R1 + 2*R2) * C1)
// With R1=10k, R2=47k, C1=10uF:
// f = 1.44 / ((10000 + 2*47000) * 0.000010) = 1.38 Hz (~1.4 flashes per second)`,
    required_libraries: ['None (Zero code)'],
    expected_output: 'When the 9V battery is snapped in, the Red and Green LEDs alternately flash back and forth rhythmically at about 1.4 times per second.',
    troubleshooting: [
      {
        issue: 'One LED stays on permanently and nothing flashes',
        cause: 'Pins 2 and 6 are not connected together, or Pin 4 is floating.',
        solution: 'Verify that a wire links Pin 2 to Pin 6, and Pin 4 is tied to Pin 8.'
      }
    ],
    safety_precautions: [
      'Mind the polarity of electrolytic capacitor C1: the stripe with minus signs (-) must connect to Ground.',
      'Check Pin 1 notch position on the 555 IC before applying power.'
    ],
    real_life_applications: [
      'Automotive turn signal blinkers',
      'Emergency beacon strobe lights',
      'Electronic metronomes and clock generators'
    ],
    future_improvements: [
      'Replace R2 with a 100kΩ potentiometer to allow manual adjustment of the flashing speed from a slow blink to an audible buzz.',
      'Add an active buzzer in place of one LED to make an audio metronome.'
    ],
    viva_questions: [
      {
        question: 'Why is the IC named "555"?',
        answer: 'Because of the internal voltage divider consisting of three matched 5-kilo-ohm (5kΩ) resistors that set the reference voltages to 1/3 and 2/3 of VCC.'
      },
      {
        question: 'What is the formula for the time constant of an RC circuit?',
        answer: 'Tau (τ) = R × C, which represents the time required for a capacitor to charge to approximately 63.2% of its maximum voltage.'
      },
      {
        question: 'What is the difference between Astable and Monostable modes in a 555 timer?',
        answer: 'Astable mode has no stable state—it continuously oscillates back and forth (free-running square wave). Monostable mode has one stable state and produces a single output pulse of fixed duration when externally triggered.'
      },
      {
        question: 'What is the maximum output current of the NE555 timer on Pin 3?',
        answer: 'Up to 200mA, allowing it to drive LEDs, small relays, or buzzers directly without an external transistor.'
      },
      {
        question: 'What happens to the flash frequency if you increase capacitor C1?',
        answer: 'The frequency decreases (flashing becomes slower) because a larger capacitor takes longer to fill up with charge and discharge.'
      }
    ]
  },

  // 7. MICRO:BIT TILT BUGGY / STEP COUNTER
  {
    id: 'microbit-step-counter',
    name: 'micro:bit Smart Pedometer & Activity Tracker',
    project_type: 'UNIQUE_PROJECT',
    category: 'micro:bit',
    difficulty: 'Beginner',
    class_levels: [6, 7, 8, 9],
    objective: 'Program the BBC micro:bit v2 to act as a wearable digital step counter (pedometer), detecting acceleration spikes and displaying steps on the 5x5 LED matrix.',
    problem_statement: 'Sedentary lifestyles require motivating, low-cost activity trackers to encourage daily physical exercise.',
    scientific_principle: 'MEMS capacitive accelerometer measuring gravitational and dynamic acceleration vectors (a = dv/dt).',
    required_components: [
      { component_name: 'BBC micro:bit v2', quantity: 1, alternative_names: ['micro:bit v2', 'microbit'], is_essential: true },
      { component_name: '9V Alkaline/Heavy Duty Battery + Snap Connector', quantity: 1, alternative_names: ['2xAAA battery holder with JST connector'], is_essential: false }
    ],
    working_explanation: 'The internal 3-axis accelerometer on the micro:bit continuously samples inertial forces along X, Y, and Z axes. When a person takes a walking stride, a characteristic dynamic vertical peak exceeding ~1.2G occurs. The micro:bit filters this peak, increments an internal step counter variable, and flashes the count across its 25-LED screen.',
    block_diagram: {
      inputs: ['Built-in 3-axis MEMS Accelerometer (I2C)'],
      processing: ['Nordic nRF52833 Cortex-M4 Microcontroller (Peak Detection Filter)'],
      outputs: ['5x5 Red LED Matrix Display', 'Built-in Speaker Beep'],
      power: ['2x AAA Battery Pack via JST socket (3V)']
    },
    circuit_connections: [
      { component: 'Battery Pack', pin: 'JST 2-pin', connection: 'micro:bit JST Battery Socket', notes: '3V power' }
    ],
    programming_board: 'BBC micro:bit v2',
    code_language: 'MicroPython',
    code_template: `# AI Science Lab Assistant - micro:bit v2 Pedometer
from microbit import *

step_count = 0
display.show(Image.HEART)
sleep(1000)
display.show(step_count)

while True:
    if accelerometer.was_gesture('shake'):
        step_count += 1
        display.show(step_count)
        # Optional sound on v2
        audio.play(Sound.GIGGLE)
    
    if button_a.is_pressed() and button_b.is_pressed():
        step_count = 0
        display.scroll("RESET")
        display.show(step_count)
        sleep(500)
    
    sleep(100)`,
    required_libraries: ['microbit standard library'],
    expected_output: 'When shaken or worn while walking, each stride increases the step number displayed on the LED screen, accompanied by an audio chime.',
    troubleshooting: [
      {
        issue: 'Steps count too easily with slight wrist movements',
        cause: 'Shake gesture sensitivity threshold is too sensitive.',
        solution: 'Use raw accelerometer.get_values() and check if vector magnitude sqrt(x^2 + y^2 + z^2) > 1500.'
      }
    ],
    safety_precautions: [
      'Only use 2x AAA batteries (3V) via the JST connector. Never connect 9V to the micro:bit!'
    ],
    real_life_applications: [
      'Fitbit and Apple Watch activity tracking',
      'Sports fitness monitoring',
      'Elderly fall detection sensors'
    ],
    future_improvements: [
      'Use the micro:bit built-in radio to transmit live step counts wirelessly to a teacher\'s master micro:bit!'
    ],
    viva_questions: [
      {
        question: 'What does MEMS stand for?',
        answer: 'Micro-Electro-Mechanical Systems: microscopic mechanical sensors fabricated on silicon chips.'
      },
      {
        question: 'How does an accelerometer detect motion?',
        answer: 'A microscopic proof mass suspended on silicon springs moves when accelerated, changing the capacitance between micro-fingers.'
      },
      {
        question: 'Why should you never connect a 9V battery directly to a micro:bit?',
        answer: 'The micro:bit operates strictly at 3.3V. Feeding 9V directly will permanently burn out the nRF52 microcontroller chip.'
      },
      {
        question: 'What is the resolution of the micro:bit LED matrix display?',
        answer: '5 by 5 grid, giving 25 individually addressable red LEDs.'
      },
      {
        question: 'How does the micro:bit communicate with its onboard sensors?',
        answer: 'Via an internal I2C serial communication bus.'
      }
    ]
  },

  // 8. MULTI-MODE AUTONOMOUS ROBOT (OBSTACLE AVOIDER + LINE FOLLOWER COMBINED)
  {
    id: 'multi-mode-autonomous-robot',
    name: 'Multi-Mode Autonomous Hybrid Robot (Line + Obstacle)',
    project_type: 'UNIQUE_PROJECT',
    category: 'Robotics',
    difficulty: 'Advanced',
    class_levels: [9, 10, 11, 12],
    objective: 'Build an advanced dual-capability robotics platform that follows a line path while proactively stopping or circumnavigating unexpected obstacles.',
    problem_statement: 'Real-world automated factory robots cannot simply blindly follow lines on the floor; they must immediately halt or divert if a worker steps onto the track.',
    scientific_principle: 'Sensor fusion: Combining optical infrared line tracking with acoustic ultrasonic distance ranging in a unified real-time control loop.',
    required_components: [
      { component_name: 'Arduino UNO R3', quantity: 1, alternative_names: ['Arduino Uno'], is_essential: true },
      { component_name: 'L298N Dual H-Bridge Motor Driver Module', quantity: 1, alternative_names: ['L298N'], is_essential: true },
      { component_name: 'HC-SR04 Ultrasonic Distance Sensor', quantity: 1, alternative_names: ['HC-SR04'], is_essential: true },
      { component_name: 'IR Line Tracking Sensor Module', quantity: 2, alternative_names: ['IR Line Sensor'], is_essential: true },
      { component_name: 'BO Yellow Gear Motor (Dual Axis)', quantity: 2, alternative_names: ['BO Motor'], is_essential: true },
      { component_name: '2WD Smart Robot Car Chassis Kit', quantity: 1, alternative_names: ['Robot Chassis'], is_essential: true },
      { component_name: '18650 Li-ion Rechargeable Battery (3.7V ~2500mAh)', quantity: 2, alternative_names: ['18650 Cell'], is_essential: true }
    ],
    working_explanation: 'The robot constantly checks both the HC-SR04 distance and the left/right IR line sensors in every cycle of its loop. If the ultrasonic sensor detects an obstacle within 20cm, it overrides the line following and immediately stops the motors. Once the obstacle is cleared from the path, the robot resumes following the track.',
    block_diagram: {
      inputs: ['HC-SR04 Distance Sensor', 'Left IR Line Sensor', 'Right IR Line Sensor'],
      processing: ['Arduino UNO Hierarchical State Machine (Obstacle Priority > Line Follower)'],
      outputs: ['L298N Driver', 'Left Motor', 'Right Motor'],
      power: ['7.4V Li-ion Battery pack with common ground']
    },
    circuit_connections: [
      { component: 'HC-SR04', pin: 'TRIG', connection: 'Arduino Pin 9', notes: 'Trigger' },
      { component: 'HC-SR04', pin: 'ECHO', connection: 'Arduino Pin 10', notes: 'Echo' },
      { component: 'Left IR Sensor', pin: 'D0', connection: 'Arduino Pin 2', notes: 'Left Line' },
      { component: 'Right IR Sensor', pin: 'D0', connection: 'Arduino Pin 3', notes: 'Right Line' },
      { component: 'L298N', pin: 'IN1-IN4', connection: 'Arduino Pins 5, 6, 7, 8', notes: 'Motor H-Bridge' }
    ],
    programming_board: 'Arduino UNO',
    code_language: 'C++',
    code_template: `// AI Science Lab Assistant - Multi-Mode Hybrid Robot
const int LEFT_IR = 2;
const int RIGHT_IR = 3;
const int TRIG_PIN = 9;
const int ECHO_PIN = 10;
const int IN1 = 5, IN2 = 6, IN3 = 7, IN4 = 8;

long getDistance() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  long d = pulseIn(ECHO_PIN, HIGH, 20000);
  if (d == 0) return 999;
  return (d * 0.034) / 2;
}

void moveForward() { digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW); digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW); }
void turnLeft() { digitalWrite(IN1, LOW); digitalWrite(IN2, LOW); digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW); }
void turnRight() { digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW); digitalWrite(IN3, LOW); digitalWrite(IN4, LOW); }
void stopMotors() { digitalWrite(IN1, LOW); digitalWrite(IN2, LOW); digitalWrite(IN3, LOW); digitalWrite(IN4, LOW); }

void setup() {
  pinMode(LEFT_IR, INPUT);
  pinMode(RIGHT_IR, INPUT);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT); pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT);
  stopMotors();
}

void loop() {
  long distance = getDistance();
  // Priority 1: Obstacle Safety
  if (distance < 20) {
    stopMotors();
    delay(50);
    return;
  }
  
  // Priority 2: Line Following
  int leftVal = digitalRead(LEFT_IR);
  int rightVal = digitalRead(RIGHT_IR);
  
  if (leftVal == LOW && rightVal == LOW) moveForward();
  else if (leftVal == HIGH && rightVal == LOW) turnLeft();
  else if (leftVal == LOW && rightVal == HIGH) turnRight();
  else stopMotors();
  delay(10);
}`,
    required_libraries: ['None'],
    expected_output: 'Follows the black track continuously. If an obstacle or human hand appears on the track, the robot halts immediately and waits. As soon as the obstacle is removed, it seamlessly resumes following the line.',
    troubleshooting: [
      {
        issue: 'Robot pauses frequently while tracking line',
        cause: 'Ultrasonic pulseIn timeout causing loop delays.',
        solution: 'Set pulseIn timeout to 20000 microseconds (~3.4m maximum).'
      }
    ],
    safety_precautions: ['Fasten the battery holder securely with cable ties so it does not shift into wheels.'],
    real_life_applications: ['Smart hospital medication delivery trolleys', 'Airport self-driving baggage trains'],
    future_improvements: ['Add a buzzer to sound an alert horn when an obstacle blocks the path.'],
    viva_questions: [
      {
        question: 'What is sensor fusion in robotics?',
        answer: 'The process of combining sensory data derived from disparate sources (such as optical and ultrasonic sensors) so that the resulting information is more accurate and robust than when sensors are used individually.'
      },
      {
        question: 'Why does safety override line following in the control architecture?',
        answer: 'Safety is the highest priority: hitting an obstacle can cause physical injury or robot damage, whereas pausing line tracking carries no physical danger.'
      },
      {
        question: 'What type of control architecture is this?',
        answer: 'Subsumption / reactive hierarchical architecture, pioneered by Rodney Brooks at MIT.'
      },
      {
        question: 'What is the role of the 2-cell 18650 battery pack?',
        answer: 'Provides 7.4V nominal (up to 8.4V fully charged) with high discharge capability to power both motors and the Arduino.'
      },
      {
        question: 'How do you prevent motor electrical noise from resetting the Arduino?',
        answer: 'By soldering 100nF ceramic noise-suppression capacitors across motor terminals, using a common ground, and powering motors from an external battery.'
      }
    ]
  }
];

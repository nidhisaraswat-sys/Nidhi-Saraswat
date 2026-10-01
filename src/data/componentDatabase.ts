import { LabComponent } from '../types/lab';

export const COMPONENT_DATABASE: LabComponent[] = [
  // --- MICROCONTROLLERS & BRAINS ---
  {
    id: 'arduino-uno-r3',
    name: 'Arduino UNO R3',
    aliases: ['Arduino Uno', 'ATmega328P Uno', 'Uno Board', 'Arduino'],
    category: 'Microcontroller & Brain',
    modelNumber: 'ATmega328P R3',
    visual_features: [
      'Standard blue rectangular PCB',
      'Silver USB Type-B port at upper-left corner',
      'Black cylindrical DC barrel jack (2.1mm)',
      '16MHz crystal resonator in silver can',
      'Dual female header strips (Digital 0-13, Analog A0-A5, Power pins)',
      'ATmega328P DIP-28 or QFP IC package in center'
    ],
    working_principle: 'Microcontroller executing instructions compiled from C/C++, orchestrating digital I/O, analog sampling, timers, and PWM signals.',
    scientific_principle: 'Von Neumann / Harvard architecture semiconductor microprocessing with on-chip Flash, SRAM, and EEPROM.',
    what_is_it: 'A programmable microcontroller development board based on the Microchip ATmega328P.',
    what_it_does: 'Acts as the central "brain" of circuits, reading inputs from sensors and controlling outputs like LEDs, motors, and displays.',
    inputs: 'Digital logic (HIGH=5V, LOW=0V) on pins 0-13; Analog voltages (0-5V, 10-bit ADC 0-1023) on pins A0-A5.',
    outputs: 'Digital 5V HIGH / 0V LOW, 8-bit PWM (0-255) on pins 3, 5, 6, 9, 10, 11; 5V and 3.3V regulated power rails.',
    pins: [
      { name: '5V', type: 'Power', description: 'Regulated 5V output (max ~400-500mA via USB)' },
      { name: '3.3V', type: 'Power', description: 'Regulated 3.3V output (max 50mA)' },
      { name: 'GND', type: 'Ground', description: 'Common reference ground' },
      { name: 'VIN', type: 'Power', description: 'Raw input voltage (7-12V DC recommended)' },
      { name: 'A0-A5', type: 'Analog Input', description: '10-bit Analog to Digital converter pins' },
      { name: 'D0 (RX)', type: 'UART', description: 'Serial Receive / Digital I/O' },
      { name: 'D1 (TX)', type: 'UART', description: 'Serial Transmit / Digital I/O' },
      { name: 'D2-D13', type: 'Digital Input', description: 'General Purpose Input/Output pins (Pins 3,5,6,9,10,11 support PWM)' }
    ],
    voltage: '5V Operating (7-12V Recommended via DC Barrel / VIN)',
    operating_voltage_min: 5,
    operating_voltage_max: 12,
    current: 'Max 20mA recommended per GPIO pin (40mA absolute max); Total chip current limit: 200mA',
    max_current_draw_ma: 20,
    logic_level: '5V TTL logic (HIGH: >3.0V, LOW: <1.5V)',
    interfaces: ['UART / Serial (D0/D1)', 'I2C (A4=SDA, A5=SCL)', 'SPI (D10=SS, D11=MOSI, D12=MISO, D13=SCK)', 'PWM'],
    compatible_boards: ['Shields', 'Standard breadboards', 'Sensors 5V'],
    common_projects: ['Obstacle Avoiding Robot', 'Line Follower Robot', 'Ultrasonic Distance Meter', 'Smart Irrigation System', 'Digital Thermometer'],
    required_drivers: ['Arduino IDE with CH340 or Atmega16U2 USB drivers'],
    safety: [
      'NEVER exceed 20mA draw per GPIO pin; never connect motors or pumps directly to GPIO pins.',
      'NEVER supply more than 12V to VIN or DC jack without heat sinking the onboard AMS1117 regulator.',
      'Never short 5V to GND.'
    ],
    never_connect_to: ['Motors directly to GPIO', '12V pumps directly', 'Mains AC lines without relay isolation'],
    fun_fact: 'The name "Arduino" comes from a bar in Ivrea, Italy, where the original team met in 2005.',
    student_summary: {
      simple_definition: 'The programmable computer brain that controls your electronics projects.',
      how_it_works_kid: 'You write instructions in code on your computer, upload them through the USB cable, and the Arduino executes them step-by-step.',
      why_we_use_it: 'It makes it easy to read sensors (like buttons or light) and turn on gadgets (like lights or motors).',
      golden_safety_rule: 'Never connect heavy motors directly to the tiny Arduino pins, always use a driver or relay!'
    }
  },
  {
    id: 'bbc-microbit-v2',
    name: 'BBC micro:bit v2',
    aliases: ['micro:bit v2', 'microbit', 'BBC microbit'],
    category: 'Microcontroller & Brain',
    modelNumber: 'micro:bit v2 (nRF52833)',
    visual_features: [
      'Compact rectangular PCB with rounded bottom edge',
      '5x5 red LED display matrix on front',
      'Two physical buttons labeled A and B',
      'Notched gold-plated edge connector on bottom with large rings 0, 1, 2, 3V, GND',
      'Rear built-in speaker and MEMS microphone hole with LED indicator',
      'Rear touch logo and reset button'
    ],
    working_principle: 'ARM Cortex-M4 32-bit processor running MicroPython, MakeCode block code, or C++, with built-in sensors (accelerometer, compass, mic, temperature).',
    scientific_principle: 'Integrated MEMS inertial sensing, capacitive touch detection, and 2.4GHz BLE wireless mesh radio.',
    what_is_it: 'A pocket-sized programmable computer designed for education, with built-in LED matrix, buttons, speaker, mic, and radio.',
    what_it_does: 'Detects motion, sound, temperature, and touch; displays text and animations on its 5x5 LED matrix; communicates over radio.',
    inputs: 'Buttons A & B, capacitive touch logo, microphone, 3-axis accelerometer/magnetometer, edge pins 0, 1, 2.',
    outputs: '5x5 red LED grid (25 LEDs), built-in speaker sound, edge pins (PWM, digital, 3.3V).',
    pins: [
      { name: '0', type: 'Digital Input', description: 'General GPIO / Analog In / Touch ring' },
      { name: '1', type: 'Digital Input', description: 'General GPIO / Analog In / Touch ring' },
      { name: '2', type: 'Digital Input', description: 'General GPIO / Analog In / Touch ring' },
      { name: '3V', type: 'Power', description: '3.3V power output (max 190mA for peripherals)' },
      { name: 'GND', type: 'Ground', description: 'System reference ground' },
      { name: 'Edge Connector', type: 'Passive', description: 'Full breakout for SPI, I2C, UART pins' }
    ],
    voltage: '3.0V - 3.3V (via 2xAAA battery pack JST connector or micro-USB 5V to 3.3V onboard LDO)',
    operating_voltage_min: 3.0,
    operating_voltage_max: 3.3,
    current: 'Max ~5mA per GPIO pin; max 190mA external load on 3V ring',
    max_current_draw_ma: 5,
    logic_level: '3.3V logic (DO NOT connect 5V signals directly to micro:bit edge pins!)',
    interfaces: ['BLE Radio', 'I2C', 'SPI', 'PWM', 'Capacitive Touch'],
    compatible_boards: ['micro:bit edge breakout board', 'micro:bit motor driver expansion', 'SG90 servo via breakout'],
    common_projects: ['micro:bit Step Counter', 'Tilt-Controlled Buggy', 'Sound-Activated Nightlight', 'Wireless Peer-to-Peer Chat', 'Compass Game'],
    required_drivers: ['MakeCode web editor or MicroPython (standard USB Mass Storage drive)'],
    safety: [
      'STRICT 3.3V LIMIT: Feeding 5V into the micro:bit edge connector will permanently damage the nRF52 chip!',
      'Use a level shifter or dedicated breakout when interfacing with 5V sensors like standard HC-SR04.'
    ],
    never_connect_to: ['5V supply to 3V ring', 'Motors directly to edge rings', '5V signals without level shifting'],
    fun_fact: 'BBC gave a free micro:bit to every 11-12 year old in the UK to kickstart computer science education.',
    student_summary: {
      simple_definition: 'A pocket-sized mini computer with built-in sensors, lights, and a speaker.',
      how_it_works_kid: 'It senses when you shake, tilt, or speak to it, and can light up icons or play tunes on its speaker.',
      why_we_use_it: 'It is the friendliest way to learn robotics, games, and coding using blocks or Python.',
      golden_safety_rule: 'Always use 3V, never plug 5V or big batteries directly into the gold rings!'
    }
  },
  {
    id: 'esp32-dev-board',
    name: 'ESP32 Development Board',
    aliases: ['ESP-WROOM-32', 'ESP32 NodeMCU', 'ESP32 DevKit'],
    category: 'Microcontroller & Brain',
    modelNumber: 'ESP32-WROOM-32D / 32U',
    visual_features: [
      'Narrow black PCB with dual 15-pin or 19-pin header rows',
      'Silver metal shielding can with "ESP-WROOM-32" laser-etched logo',
      'Meandering PCB trace copper antenna at top',
      'Micro-USB port and CP2102 or CH340 USB-UART IC',
      'EN (Reset) and BOOT tactile push buttons'
    ],
    working_principle: 'Dual-core Xtensa 32-bit LX6 microprocessor at up to 240MHz with integrated 2.4GHz Wi-Fi 802.11b/g/n and Bluetooth v4.2 BR/EDR & BLE.',
    scientific_principle: 'Ultra-low-power RF transceiver with dual CPU cores handling networking and real-time sensor processing concurrently.',
    what_is_it: 'A high-performance IoT microcontroller board with integrated Wi-Fi and Bluetooth.',
    what_it_does: 'Connects sensors to the cloud, hosts web servers, streams data, and runs smart home / robotics projects.',
    inputs: 'Capacitive touch pins, 12-bit ADC (pins 32-39, etc.), digital inputs, UART, SPI, I2C.',
    outputs: 'Digital outputs, PWM, 8-bit DAC (GPIO25/26), Wi-Fi web endpoints, MQTT messages.',
    pins: [
      { name: '3V3', type: 'Power', description: 'Regulated 3.3V output' },
      { name: 'GND', type: 'Ground', description: 'Common ground' },
      { name: 'VIN / 5V', type: 'Power', description: '5V input from USB or external regulated 5V' },
      { name: 'GPIO21 (SDA)', type: 'I2C', description: 'Default I2C Data line' },
      { name: 'GPIO22 (SCL)', type: 'I2C', description: 'Default I2C Clock line' },
      { name: 'GPIO34-39', type: 'Analog Input', description: 'Input-only pins with 12-bit ADC' },
      { name: 'GPIO2', type: 'Digital Output', description: 'Built-in blue LED and strapping pin' }
    ],
    voltage: '3.3V Operating (5V input tolerated on VIN via onboard LDO)',
    operating_voltage_min: 3.0,
    operating_voltage_max: 3.6,
    current: 'Up to 250mA peak during Wi-Fi transmission bursts; GPIO pin max 12mA',
    max_current_draw_ma: 12,
    logic_level: '3.3V ONLY. GPIO pins are NOT 5V tolerant!',
    interfaces: ['Wi-Fi 802.11 b/g/n', 'BLE / Bluetooth', 'I2C', 'SPI', 'UART', 'I2S', 'Capacitive Touch', 'DAC'],
    compatible_boards: ['Breadboards', '3.3V sensors', 'Relay modules with optocoupler', 'PCA9685'],
    common_projects: ['IoT Smart Plant Monitor', 'Cloud Weather Station', 'ESP32 Web Server Robot', 'Soil Health Dashboard', 'Bluetooth Controller'],
    required_drivers: ['Silicon Labs CP210x or WCH CH340 USB to UART driver'],
    safety: [
      'STRICT: GPIO pins are NOT 5V tolerant! Applying 5V directly to any GPIO pin will destroy that pin or the entire ESP32 module.',
      'Needs a stable power supply (at least 500mA) to avoid brownout resets when Wi-Fi connects.'
    ],
    never_connect_to: ['5V signals directly to GPIO', 'High current loads directly to pins'],
    fun_fact: 'The ESP32 has two separate processing cores named PRO_CPU (Protocol) and APP_CPU (Application).',
    student_summary: {
      simple_definition: 'A super-fast computer brain with built-in Wi-Fi and Bluetooth.',
      how_it_works_kid: 'It thinks fast with two computer brains and can talk to your phone or send sensor data over the internet.',
      why_we_use_it: 'Whenever you want to build IoT gadgets that you can control from anywhere on a web page or phone.',
      golden_safety_rule: 'Never connect 5V to its pins, it only likes 3.3V!'
    }
  },

  // --- SENSORS ---
  {
    id: 'hc-sr04-ultrasonic',
    name: 'HC-SR04 Ultrasonic Distance Sensor',
    aliases: ['HC-SR04', 'Ultrasonic Sensor', 'Sonar Sensor'],
    category: 'Sensor',
    modelNumber: 'HC-SR04',
    visual_features: [
      'Blue rectangular PCB with two silver cylindrical "eyes" (ultrasonic transducers)',
      'One cylinder marked "T" (Transmitter), the other marked "R" (Receiver)',
      '4-pin right-angle header at bottom edge labeled VCC, TRIG, ECHO, GND',
      'Small crystal oscillator in metal casing on back'
    ],
    working_principle: 'Emits an 8-cycle 40kHz ultrasonic sound burst when triggered, measures time elapsed until echo bounces back to calculate distance: Distance = (Time × Speed of Sound) / 2.',
    scientific_principle: 'Echolocation and Acoustic Time-of-Flight (ToF). Speed of sound in dry air at 20°C is ~343 m/s (approx 29.1 µs per cm).',
    what_is_it: 'An ultrasonic distance sensor that measures the distance to an obstacle using inaudible high-frequency sound waves.',
    what_it_does: 'Provides distance measurements from 2cm to 400cm with non-contact precision down to 3mm.',
    inputs: 'TRIG pin: 10µs TTL digital pulse to start measurement.',
    outputs: 'ECHO pin: High pulse whose duration equals the round-trip travel time of the sound wave.',
    pins: [
      { name: 'VCC', type: 'Power', description: '5V DC Supply' },
      { name: 'TRIG', type: 'Digital Input', description: 'Trigger input (send 10µs pulse to fire sound)' },
      { name: 'ECHO', type: 'Digital Output', description: 'Echo output (stays HIGH proportional to distance)' },
      { name: 'GND', type: 'Ground', description: 'Ground connection' }
    ],
    voltage: '5V DC',
    operating_voltage_min: 4.8,
    operating_voltage_max: 5.5,
    current: 'Working current: ~15mA',
    max_current_draw_ma: 15,
    logic_level: '5V TTL. Note: ECHO output is 5V. When connecting to 3.3V boards (ESP32/micro:bit), use a voltage divider (1kΩ/2kΩ)!',
    interfaces: ['Digital Pulse Timing (pulseIn)'],
    compatible_boards: ['Arduino UNO', 'ESP32 (with voltage divider on ECHO)', 'micro:bit (via 5V breakout with level divider)'],
    common_projects: ['Obstacle Avoiding Robot', 'Ultrasonic Distance Meter', 'Smart Parking Assistant', 'Radar Prototype', 'Water Level Indicator'],
    required_drivers: ['None required (uses pulseIn) or NewPing library'],
    safety: [
      'When using with 3.3V boards (ESP32 or micro:bit), ECHO puts out 5V which will burn 3.3V inputs without a resistor voltage divider.',
      'Sound wave can be absorbed by soft cloth or angled specular surfaces resulting in false readings.'
    ],
    never_connect_to: ['ECHO pin directly to ESP32 / micro:bit without voltage divider', 'Voltages > 5.5V to VCC'],
    fun_fact: 'Bats and dolphins navigate using the exact same echolocation principle as this sensor!',
    student_summary: {
      simple_definition: 'An electronic sensor that works like bat ears to measure how far away objects are.',
      how_it_works_kid: 'One "eye" sends out a high-pitched click that humans cannot hear, and the other "eye" listens for the echo. By timing how long it takes, it calculates distance.',
      why_we_use_it: 'To prevent robots from crashing into walls and build touchless distance meters.',
      golden_safety_rule: 'When using with ESP32, use resistors so the 5V echo pulse does not shock the 3.3V pin!'
    }
  },
  {
    id: 'capacitive-soil-moisture',
    name: 'Capacitive Soil Moisture Sensor v1.2',
    aliases: ['Capacitive Soil Sensor', 'Corrosion-Resistant Soil Sensor', 'Soil Moisture v1.2'],
    category: 'Sensor',
    modelNumber: 'v1.2 (NE555 / TLC555 timer based)',
    visual_features: [
      'T-shaped elongated probe PCB with black or blue solder mask',
      'Dual broad copper traces insulated inside the PCB probe',
      'Top rectangular head with 3-pin JST or header labeled VCC, GND, AOUT',
      'Onboard surface mount 555 timer IC and voltage regulator',
      'No exposed metal on probe tines (completely insulated against corrosion)'
    ],
    working_principle: 'Measures soil dielectric permittivity. Water has a high relative permittivity (~80) compared to dry soil (~4). Changes in moisture alter probe capacitance, which alters the 555 oscillation frequency converted to an analog voltage.',
    scientific_principle: 'Capacitive reactance and dielectric constant alteration in an RC oscillator circuit. Unlike resistive sensors, no DC current passes into the soil, completely preventing electrolytic corrosion.',
    what_is_it: 'A corrosion-resistant soil moisture probe that measures moisture using capacitance rather than resistance.',
    what_it_does: 'Provides an analog voltage that drops as soil moisture increases (higher moisture = lower output voltage).',
    inputs: 'Soil contact surrounding the probe blade.',
    outputs: 'Analog voltage (typically ~3.0V in dry air, ~1.2V in 100% water).',
    pins: [
      { name: 'VCC', type: 'Power', description: '3.3V to 5.5V DC' },
      { name: 'GND', type: 'Ground', description: 'Ground' },
      { name: 'AOUT', type: 'Analog Output', description: 'Analog voltage proportional to capacitance' }
    ],
    voltage: '3.3V - 5.5V DC',
    operating_voltage_min: 3.3,
    operating_voltage_max: 5.5,
    current: 'Operating current: ~5mA',
    max_current_draw_ma: 5,
    logic_level: 'Analog output 1.2V - 3.0V',
    interfaces: ['Analog ADC (A0-A5 on Arduino, GPIO34 on ESP32)'],
    compatible_boards: ['Arduino UNO', 'ESP32', 'micro:bit (via analog pin)'],
    common_projects: ['Automatic Plant Watering System', 'Smart Irrigation Controller', 'Soil Moisture Logger', 'Drought Alarm'],
    required_drivers: ['Standard analogRead() in Arduino/ESP32'],
    safety: [
      'Do NOT submerge past the white limit line on the probe; the electronic circuitry at the top is not waterproof!',
      'Calibrate in dry air and a glass of water before embedding in soil.'
    ],
    never_connect_to: ['Submerging top circuitry in water', 'High voltages'],
    fun_fact: 'Because it uses electric fields rather than bare metal contact, its probe can last for years without corroding!',
    student_summary: {
      simple_definition: 'A probe you stick in plant soil to see if your plant is thirsty.',
      how_it_works_kid: 'Water changes the electrical field around the probe. The sensor measures this and tells the computer how wet the soil is.',
      why_we_use_it: 'Unlike cheap sensors that rust away in days, this capacitive sensor never rusts in moist dirt.',
      golden_safety_rule: 'Only stick the blade in the dirt; keep the top components and wires dry!'
    }
  },
  {
    id: 'ir-line-sensor',
    name: 'IR Line Tracking Sensor Module',
    aliases: ['IR Sensor', 'TCRT5000 Module', 'Line Follower Sensor', 'Infrared Obstacle Sensor'],
    category: 'Sensor',
    modelNumber: 'TCRT5000 / LM393 Module',
    visual_features: [
      'Small rectangular PCB (approx 3cm x 1.5cm)',
      'Side-by-side black phototransistor and blue/clear IR emitter LED pair pointing forward',
      'Blue 10k potentiometer knob for sensitivity threshold tuning',
      'LM393 dual comparator IC on board',
      'Two small SMD LEDs (Power LED and Digital D0 detection LED)',
      '3 or 4 pins: VCC, GND, D0 (and optional A0)'
    ],
    working_principle: 'Infrared LED emits invisible 950nm IR light. White/light surfaces reflect light back into the phototransistor, driving output LOW. Black/dark surfaces absorb IR light, leaving output HIGH.',
    scientific_principle: 'Infrared absorption and reflection spectroscopy combined with an LM393 voltage comparator threshold circuit.',
    what_is_it: 'An optical reflection module used for detecting contrasting colors (black vs white lines) or nearby obstacles.',
    what_it_does: 'Outputs a digital 0 or 1 depending on whether a surface reflects infrared light, ideal for line following robots.',
    inputs: 'Infrared reflection from floor or surface.',
    outputs: 'D0 digital output (active LOW on reflection), optional A0 analog intensity.',
    pins: [
      { name: 'VCC', type: 'Power', description: '3.3V to 5V DC' },
      { name: 'GND', type: 'Ground', description: 'Ground reference' },
      { name: 'D0', type: 'Digital Output', description: 'Digital output from comparator (HIGH on black, LOW on white)' },
      { name: 'A0', type: 'Analog Output', description: 'Analog reflection voltage (optional)' }
    ],
    voltage: '3.3V - 5V DC',
    operating_voltage_min: 3.3,
    operating_voltage_max: 5.0,
    current: 'Approx 15-20mA',
    max_current_draw_ma: 20,
    logic_level: 'Matches VCC (5V on Uno, 3.3V on ESP32)',
    interfaces: ['Digital GPIO', 'Analog ADC'],
    compatible_boards: ['Arduino UNO', 'ESP32', 'micro:bit'],
    common_projects: ['Line Follower Robot', 'Black/White Surface Detector', 'Conveyor Edge Counter', 'Proximity Gate'],
    required_drivers: ['None, read with digitalRead()'],
    safety: [
      'Ambient sunlight contains strong infrared which can cause false triggers; tune potentiometer under ambient room lighting.'
    ],
    never_connect_to: ['Direct power > 5.5V'],
    fun_fact: 'You can point your smartphone camera at the IR emitter to see the invisible infrared light glow purple!',
    student_summary: {
      simple_definition: 'A light sensor that can tell the difference between black lines and white ground.',
      how_it_works_kid: 'It shoots invisible infrared light downward. White paper reflects it back like a mirror, but black tape absorbs it like a shadow.',
      why_we_use_it: 'It allows robots to follow lines drawn on the floor like train tracks.',
      golden_safety_rule: 'Adjust the tiny blue screw gently with a screwdriver to calibrate sensitivity!'
    }
  },
  {
    id: 'dht11-dht22-sensor',
    name: 'DHT11 / DHT22 Temperature & Humidity Sensor',
    aliases: ['DHT11', 'DHT22', 'AM2302', 'Temp & Humidity Sensor'],
    category: 'Sensor',
    modelNumber: 'DHT11 (Blue) / DHT22 (White)',
    visual_features: [
      'Perforated plastic housing (Blue for DHT11, larger White for DHT22)',
      'Vented grid allowing ambient airflow to reach internal polymer capacitor',
      '3-pin module or 4-pin single sensor package',
      'Module version includes onboard pull-up resistor and SMD power LED'
    ],
    working_principle: 'Measures relative humidity using a moisture-holding substrate between two electrodes (capacitive or resistive), and temperature using an NTC thermistor, digitized by an internal 8-bit chip.',
    scientific_principle: 'Sorption hygrometry and negative temperature coefficient semiconductor resistance variation.',
    what_is_it: 'A digital composite sensor providing calibrated relative humidity and temperature readings.',
    what_it_does: 'Provides temperature (0-50°C for DHT11, -40 to 80°C for DHT22) and humidity (20-90% RH) readings over a single-wire digital protocol.',
    inputs: 'Ambient air moisture and thermal energy.',
    outputs: '40-bit serial digital pulse stream containing humidity, temperature, and checksum.',
    pins: [
      { name: 'VCC', type: 'Power', description: '3.3V - 5.5V DC' },
      { name: 'DATA', type: 'Digital Output', description: 'Single-wire bidirectional data line (requires 4.7k-10k pull-up resistor if bare)' },
      { name: 'GND', type: 'Ground', description: 'Ground' }
    ],
    voltage: '3.3V - 5.5V DC',
    operating_voltage_min: 3.3,
    operating_voltage_max: 5.5,
    current: '0.5mA to 2.5mA during measurement, 100µA standby',
    max_current_draw_ma: 2.5,
    logic_level: 'Matches VCC (3.3V or 5V)',
    interfaces: ['Custom Single-Wire Serial Protocol (1Hz sample rate for DHT11, 0.5Hz for DHT22)'],
    compatible_boards: ['Arduino UNO', 'ESP32', 'micro:bit'],
    common_projects: ['Smart Weather Station', 'Greenhouse Climate Monitor', 'Smart Irrigation Node', 'Room Comfort Display'],
    required_drivers: ['DHT sensor library by Adafruit'],
    safety: [
      'Do not poll faster than once every 1 to 2 seconds; polling too fast returns NaN or causes internal heating.',
      'Protect from direct chemical fumes or solvent vapours.'
    ],
    never_connect_to: ['Direct reverse polarity'],
    fun_fact: 'Humidity is "relative" because warm air can hold significantly more water vapor than cold air.',
    student_summary: {
      simple_definition: 'A weather sensor that measures room temperature and air humidity.',
      how_it_works_kid: 'It breathes in air through its tiny plastic grill and measures how warm and moist the atmosphere is.',
      why_we_use_it: 'To tell smart greenhouses when to turn on fans or watering pumps.',
      golden_safety_rule: 'Wait at least 1 second between readings so the sensor does not get confused.'
    }
  },
  {
    id: 'ldr-light-sensor',
    name: 'LDR (Light Dependent Resistor) Sensor',
    aliases: ['Photoresistor', 'LDR Module', 'Photocell', 'Light Sensor'],
    category: 'Sensor',
    modelNumber: 'GL5528 / LM393 Module',
    visual_features: [
      'Small disc with a snake-like red/orange conductive track on top face under clear resin',
      'Two silver wire leads (bare component) or 3/4-pin PCB module with LM393 comparator and potentiometer'
    ],
    working_principle: 'Cadmium Sulfide (CdS) semiconductor whose resistance drops dramatically from >1MΩ in total darkness to <5kΩ in bright sunlight.',
    scientific_principle: 'Photoconductivity: Photons with energy greater than the bandgap excite valence electrons into the conduction band, increasing electrical conductivity.',
    what_is_it: 'A light-sensitive variable resistor.',
    what_it_does: 'Detects ambient light levels, dawn/dusk transitions, and laser beam interruptions.',
    inputs: 'Photons / visible light.',
    outputs: 'Variable electrical resistance (bare) or analog/digital voltage (module).',
    pins: [
      { name: 'VCC', type: 'Power', description: '3.3V - 5V' },
      { name: 'GND', type: 'Ground', description: 'Ground' },
      { name: 'D0', type: 'Digital Output', description: 'Digital output threshold (dark/bright)' },
      { name: 'A0', type: 'Analog Output', description: 'Analog voltage proportional to brightness' }
    ],
    voltage: 'Passive component (up to 150V peak on bare component; 3.3V-5V on module)',
    operating_voltage_min: 3.3,
    operating_voltage_max: 5.0,
    current: 'Microamps',
    max_current_draw_ma: 1,
    logic_level: 'Analog voltage divider',
    interfaces: ['Analog ADC / Digital comparator'],
    compatible_boards: ['Arduino UNO', 'ESP32', 'micro:bit'],
    common_projects: ['Automatic Street Light', 'Solar Tracker', 'Laser Tripwire Alarm', 'Smart Night Lamp'],
    required_drivers: ['Standard analogRead()'],
    safety: ['If using bare LDR, always wire with a 10kΩ fixed resistor in a voltage divider circuit to prevent short circuits!'],
    never_connect_to: ['Direct 5V to GND through bare LDR without current limiting resistor'],
    fun_fact: 'Street lights around the world use LDR sensors to turn on automatically as soon as the sun sets.',
    student_summary: {
      simple_definition: 'A resistor that changes its resistance depending on how bright the room is.',
      how_it_works_kid: 'Light knocks electrons loose inside the sensor material, making it easier for electric current to flow.',
      why_we_use_it: 'To build automatic nightlights that turn on when the lights go out.',
      golden_safety_rule: 'Always pair a bare LDR with a 10k resistor in a voltage divider so you do not cause a short!'
    }
  },
  {
    id: 'rain-sensor-module',
    name: 'Raindrops Detection Sensor Module',
    aliases: ['Rain Sensor', 'Raindrop Board', 'Water Droplet Detector'],
    category: 'Sensor',
    modelNumber: 'LM393 Rain Sensor',
    visual_features: [
      'Large square double-sided PCB with alternating interleaved nickel-plated tracks',
      'Separate small driver module with LM393 comparator, sensitivity pot, and 4 pins'
    ],
    working_principle: 'Water droplets bridging the parallel tracks provide a conductive path that drops the circuit resistance, triggering comparator.',
    scientific_principle: 'Electrolytic ionic conduction in water droplets and Ohm\'s Law.',
    what_is_it: 'A moisture detection plate that senses rainwater or droplets on its surface.',
    what_it_does: 'Triggers irrigation shutoff, automatic car wipers, or clothesline covers when rain begins.',
    inputs: 'Physical water droplets on the collection grid.',
    outputs: 'Digital LOW when wet; analog voltage proportional to surface coverage.',
    pins: [
      { name: 'VCC', type: 'Power', description: '3.3V - 5V' },
      { name: 'GND', type: 'Ground', description: 'Ground' },
      { name: 'D0', type: 'Digital Output', description: 'Digital rain detected flag' },
      { name: 'A0', type: 'Analog Output', description: 'Analog moisture severity' }
    ],
    voltage: '3.3V - 5V DC',
    operating_voltage_min: 3.3,
    operating_voltage_max: 5.0,
    current: 'Approx 15mA',
    max_current_draw_ma: 15,
    logic_level: 'Matches VCC',
    interfaces: ['Digital GPIO', 'Analog ADC'],
    compatible_boards: ['Arduino UNO', 'ESP32', 'micro:bit'],
    common_projects: ['Rain-Aware Smart Irrigation', 'Automatic Rain Shutter', 'Rainfall Alert System'],
    required_drivers: ['None'],
    safety: ['Dry the sensor board after testing with water to prevent galvanic corrosion.'],
    never_connect_to: ['Mains voltage'],
    fun_fact: 'Modern cars have rain sensors glued to the windshield behind the rear-view mirror to control automatic wipers.',
    student_summary: {
      simple_definition: 'A weather sensor plate that detects raindrops falling on it.',
      how_it_works_kid: 'Raindrops act like tiny bridges connecting the metal tracks together, letting electricity flow across.',
      why_we_use_it: 'So our smart farming system knows to stop watering plants when real rain is already doing the job!',
      golden_safety_rule: 'Dry the plate with a tissue after experiments.'
    }
  },

  // --- ACTUATORS & MOTORS ---
  {
    id: 'l298n-motor-driver',
    name: 'L298N Dual H-Bridge Motor Driver Module',
    aliases: ['L298N', 'Motor Driver Board', 'Dual H-Bridge Driver'],
    category: 'Driver & Controller',
    modelNumber: 'L298N',
    visual_features: [
      'Red square PCB with prominent black aluminum finned heatsink in center',
      'Multi-lead L298N multiwatt IC clamped to heatsink',
      'Blue screw terminal blocks: 3-screw block for Power (12V, GND, 5V), two 2-screw blocks for Motor A and Motor B',
      '6 male control pins: ENA, IN1, IN2, IN3, IN4, ENB with black jumpers on ENA/ENB',
      'Small 5V regulator jumper near the 12V terminal'
    ],
    working_principle: 'Dual full-bridge driver using high-power BJT transistors configured as H-bridges to control direction and speed (via PWM) of two DC motors or one stepper.',
    scientific_principle: 'Lorentz force and H-bridge polarity inversion allowing bidirectional DC current flow.',
    what_is_it: 'A high-power motor driver module that isolates delicate microcontrollers from heavy motor currents.',
    what_it_does: 'Drives two DC motors (up to 2A per channel) forwards, backwards, or brake, using low-power logic signals from Arduino/ESP32.',
    inputs: 'IN1, IN2 (Motor A direction), IN3, IN4 (Motor B direction), ENA, ENB (PWM speed).',
    outputs: 'OUT1, OUT2 (Motor A terminals), OUT3, OUT4 (Motor B terminals).',
    pins: [
      { name: '12V', type: 'Power', description: 'Motor power supply (7V - 35V DC, typically 7.4V - 12V battery pack)' },
      { name: 'GND', type: 'Ground', description: 'COMMON GROUND (Must connect to battery (-) and Arduino GND!)' },
      { name: '5V', type: 'Power', description: '5V output if onboard 78M05 jumper is ON, or 5V logic input if jumper OFF' },
      { name: 'IN1, IN2', type: 'Digital Input', description: 'Motor A direction logic' },
      { name: 'IN3, IN4', type: 'Digital Input', description: 'Motor B direction logic' },
      { name: 'ENA, ENB', type: 'PWM', description: 'Motor speed PWM inputs (remove jumpers to control speed)' }
    ],
    voltage: 'Motor supply: 7V - 35V DC; Logic supply: 5V DC',
    operating_voltage_min: 7.0,
    operating_voltage_max: 35.0,
    current: 'Up to 2A continuous per bridge (heatsink required)',
    max_current_draw_ma: 2000,
    logic_level: '5V TTL logic (High: 2.3V - 5V, Low: -0.3V - 1.5V)',
    interfaces: ['Digital GPIO', 'PWM speed control'],
    compatible_boards: ['Arduino UNO', 'ESP32 (3.3V logic triggers inputs reliably)', 'micro:bit'],
    common_projects: ['Obstacle Avoiding Robot', 'Line Follower Robot', '2WD / 4WD Robot Car', 'Dual DC Motor Testbench'],
    required_drivers: ['None, direct digital and analogWrite() pins'],
    safety: [
      'CRITICAL: ALWAYS connect the L298N GND to the Arduino GND! If grounds are not connected, the signals have no reference and motors will jitter or fail.',
      'NEVER power high-drain BO motors from the Arduino 5V pin; always use a separate battery pack (like 2x 18650 or 4x AA) connected to the L298N 12V terminal.',
      'If motor voltage exceeds 12V, REMOVE the 5V regulator jumper to avoid frying the onboard 78M05 chip.'
    ],
    never_connect_to: ['Powering motors from Arduino 5V rail', 'Missing common ground between battery and Arduino'],
    fun_fact: 'An "H-bridge" is named after the shape of the schematic diagram: four switching transistors arranged like the letter H with the motor in the crossbar.',
    student_summary: {
      simple_definition: 'A muscle module that takes tiny signals from Arduino and sends strong battery power to your robot motors.',
      how_it_works_kid: 'It has four electronic gates arranged in an H-shape. By opening pairs of gates, it can reverse the direction of current to make motors spin forward or backward.',
      why_we_use_it: 'Because Arduino pins only have enough power to light a tiny LED; plugging a motor into an Arduino pin would instantly burn out the chip!',
      golden_safety_rule: 'Always connect Arduino GND and Battery GND together to the driver GND!'
    }
  },
  {
    id: 'bo-gear-motors',
    name: 'BO Yellow Gear Motor (Dual Axis)',
    aliases: ['BO Motor', 'Yellow DC Motor', 'Gear Motor 3V-6V', 'Robot Motor'],
    category: 'Actuator & Motor',
    modelNumber: 'BO-1 / BO-2 (1:48 gear ratio)',
    visual_features: [
      'Bright yellow plastic rectangular gearbox casing',
      'Dual white plastic slotted output shafts protruding from both sides',
      'Silver metal DC motor body clamped inside yellow housing',
      'Two soldered solder tabs/leads with red and black wires'
    ],
    working_principle: 'Brushed DC motor spinning at ~10,000 RPM, coupled through internal spur gears (typically 1:48 or 1:120 ratio) to convert high speed into high torque at ~200 RPM.',
    scientific_principle: 'Electromagnetic induction: Lorentz force on armature windings within permanent stator magnets; torque multiplication via gear ratio.',
    what_is_it: 'A low-cost, high-torque geared DC motor used for powering school educational robots.',
    what_it_does: 'Rotates robot wheels with sufficient torque to push a 500g chassis across floors.',
    inputs: 'DC Voltage (3V - 6V) applied across the two solder leads.',
    outputs: 'Rotational mechanical torque on output shafts.',
    pins: [
      { name: 'Lead + (Red)', type: 'Power', description: 'Motor terminal A' },
      { name: 'Lead - (Black)', type: 'Power', description: 'Motor terminal B (swap polarity to reverse spin)' }
    ],
    voltage: '3V - 6V DC (Optimal: 4.5V - 6V)',
    operating_voltage_min: 3.0,
    operating_voltage_max: 6.0,
    current: 'No-load: ~150mA; Stall current: ~800mA - 1200mA at 6V',
    max_current_draw_ma: 1200,
    logic_level: 'N/A (Power load)',
    interfaces: ['DC Motor Driver (L298N, L293D, or Relay)'],
    compatible_boards: ['Arduino / ESP32 / micro:bit ONLY via motor driver'],
    common_projects: ['2WD Robot Car', 'Line Follower', 'Obstacle Avoider', 'Mechanical Loader'],
    required_drivers: ['L298N or L293D motor driver'],
    safety: [
      'NEVER connect directly to microcontroller GPIO pins (draws up to 1A stall current which is 50x what a pin can supply).',
      'Add a 100nF ceramic capacitor across motor terminals to suppress brush spark electrical noise (EMI).'
    ],
    never_connect_to: ['Direct Arduino/ESP32 GPIO pin', 'Mains power'],
    fun_fact: 'The letters "BO" stand for "Battery Operated" motor!',
    student_summary: {
      simple_definition: 'A small electric motor with internal gears that spins your robot wheels.',
      how_it_works_kid: 'Magnets and electricity make an internal coil spin very fast, and plastic gears slow it down while making it strong enough to move your robot.',
      why_we_use_it: 'It is the perfect, easy-to-use motor for building 2-wheeled and 4-wheeled robot cars.',
      golden_safety_rule: 'Never plug directly into Arduino pins; always go through a motor driver board!'
    }
  },
  {
    id: 'sg90-servo-motor',
    name: 'SG90 9g Micro Servo Motor',
    aliases: ['SG90', 'TowerPro SG90', '9g Servo', 'Micro Servo'],
    category: 'Actuator & Motor',
    modelNumber: 'SG90 9g',
    visual_features: [
      'Translucent blue plastic miniature housing (approx 22mm x 11.5mm x 27mm)',
      'White plastic output spline with attachment horns (cross, single arm, double arm)',
      '3-wire flat ribbon cable: Brown (GND), Red (5V VCC), Orange (PWM Signal)'
    ],
    working_principle: 'Closed-loop feedback servomechanism. A DC motor drives nylon gears and an internal potentiometer. An onboard control chip compares incoming 50Hz PWM pulse width with potentiometer position to precisely lock shaft angle (0° to 180°).',
    scientific_principle: 'Pulse-Width Modulation (PWM) duty-cycle encoding and proportional closed-loop position control. Pulse width 1ms = 0°, 1.5ms = 90°, 2ms = 180°.',
    what_is_it: 'A miniature rotary actuator that moves precisely to specified angles between 0 and 180 degrees.',
    what_it_does: 'Pans sensors (like HC-SR04 for radar scans), operates robot arms, steering linkages, and barrier gates.',
    inputs: '50Hz PWM signal on Orange wire (pulse width 500µs to 2400µs).',
    outputs: 'Precise angular mechanical positioning.',
    pins: [
      { name: 'Brown', type: 'Ground', description: 'GND ground reference' },
      { name: 'Red', type: 'Power', description: '5V DC Power' },
      { name: 'Orange', type: 'PWM', description: 'PWM control signal from microcontroller pin' }
    ],
    voltage: '4.8V - 6.0V DC',
    operating_voltage_min: 4.8,
    operating_voltage_max: 6.0,
    current: 'Idle: 10mA; Moving: 100-250mA; Stall: ~650mA',
    max_current_draw_ma: 650,
    logic_level: '3.3V or 5V PWM signal compatible',
    interfaces: ['Standard 50Hz RC PWM'],
    compatible_boards: ['Arduino UNO', 'ESP32', 'micro:bit (via 5V breakout)', 'PCA9685 Driver'],
    common_projects: ['Ultrasonic Radar Scanner', 'Automatic Toll Gate / Barrier', 'Pan-Tilt Camera Gimbal', 'Robotic Gripper / Loader'],
    required_drivers: ['Servo.h library in Arduino IDE'],
    safety: [
      'While a single SG90 can sometimes run off an Arduino 5V pin during light load, moving against resistance can brown out the Arduino.',
      'For multiple servos or heavy loads, power servos from an external 5V/6V supply with common ground.',
      'Do not force the shaft with your fingers while powered, or you will strip the plastic gears!'
    ],
    never_connect_to: ['Reverse polarity (Red to GND, Brown to 5V will burn internal IC)'],
    fun_fact: 'RC hobby servos were originally invented for radio-controlled airplanes in the 1960s!',
    student_summary: {
      simple_definition: 'A smart motor that turns to an exact angle, like turning an arm to exactly 45 degrees or 90 degrees.',
      how_it_works_kid: 'The computer sends quick electrical pulses that tell it which angle to hold. An internal sensor checks its own position so it never overshoots.',
      why_we_use_it: 'For radar sweeps, waving robot arms, opening smart gates, and steering.',
      golden_safety_rule: 'Never twist the motor arm roughly with your hands while it is turned on, or the tiny plastic gear teeth will break!'
    }
  },
  {
    id: 'relay-module-5v',
    name: '5V 1-Channel Relay Module (Optocoupler)',
    aliases: ['5V Relay', 'Relay Module', 'Optocoupler Relay', 'Single Channel Relay'],
    category: 'Driver & Controller',
    modelNumber: 'Songle SRD-05VDC-SL-C Module',
    visual_features: [
      'Blue rectangular plastic sealed cube marked "SONGLE 10A 250VAC / 5VDC"',
      'Blue 3-position screw terminal on high-voltage side (NO, COM, NC)',
      '3-pin male header on low-voltage side (VCC, GND, IN)',
      'Black 4-pin EL817 optocoupler IC for optical isolation',
      'Red Power LED and Green relay activated status LED',
      'Small flyback protection diode and switching transistor'
    ],
    working_principle: 'Electromagnetic relay. Sending a logic signal energizes a low-power electromagnet coil inside the blue cube. The magnetic field pulls a flexible mechanical armature, switching the high-power contacts between Normally Closed (NC) and Normally Open (NO).',
    scientific_principle: 'Electromagnetism (Ampere\'s Law) and mechanical contact switching with galvanic optical isolation.',
    what_is_it: 'An electrically operated mechanical switch that lets a 5V microcontroller safely control high-power devices like pumps and lamps.',
    what_it_does: 'Switches external DC loads (up to 30V 10A) on or off with an audible satisfying "click".',
    inputs: 'IN pin: Digital LOW (active-low module) or HIGH turns on relay coil.',
    outputs: 'Dry mechanical switch contacts: COM (Common), NO (Normally Open), NC (Normally Closed).',
    pins: [
      { name: 'VCC', type: 'Power', description: '5V DC supply for coil' },
      { name: 'GND', type: 'Ground', description: 'Ground reference' },
      { name: 'IN', type: 'Digital Input', description: 'Logic control pin from Arduino/ESP32' },
      { name: 'COM', type: 'Passive', description: 'Common contact terminal' },
      { name: 'NO', type: 'Passive', description: 'Normally Open contact (closes when relay is activated)' },
      { name: 'NC', type: 'Passive', description: 'Normally Closed contact (opens when relay is activated)' }
    ],
    voltage: '5V DC coil voltage; Contacts rated for up to 30V DC 10A / 250V AC 10A',
    operating_voltage_min: 4.5,
    operating_voltage_max: 5.5,
    current: 'Coil current: ~70mA when energized',
    max_current_draw_ma: 75,
    logic_level: '5V TTL (Trigger current ~3mA via optocoupler)',
    interfaces: ['Digital GPIO (Active LOW on most standard modules)'],
    compatible_boards: ['Arduino UNO', 'ESP32 (via optocoupler input)', 'micro:bit (with 5V coil rail)'],
    common_projects: ['Automatic Plant Watering Pump Controller', 'Smart Home Light Switch', 'Rain Alert Alarm', 'DC Load Disconnect'],
    required_drivers: ['None, standard digitalWrite()'],
    safety: [
      'SCHOOL LAB SAFETY RULE: NEVER connect mains electricity (110V/230V AC) in school/ATL lab projects without certified teacher supervision! Always stick to safe low-voltage DC (e.g. 5V-12V pumps/fans).',
      'Remember that most 1-channel relay modules are ACTIVE-LOW (digitalWrite(pin, LOW) turns the switch ON, and HIGH turns it OFF).'
    ],
    never_connect_to: ['Mains 230V AC unsupervised in school prototypes', 'Powering coil directly from a single GPIO without the module transistor'],
    fun_fact: 'Relays were originally invented by Joseph Henry in 1835 to amplify telegraph signals along long transcontinental wires!',
    student_summary: {
      simple_definition: 'An automatic electronic light switch controlled by computer code.',
      how_it_works_kid: 'When the computer sends a signal, a tiny magnet inside clicks a switch closed to turn on heavy appliances like a water pump.',
      why_we_use_it: 'So our tiny 5V Arduino can control heavy motors, pumps, and lights without getting fried.',
      golden_safety_rule: 'Only use safe 5V to 12V battery power in the lab; never connect 230V wall sockets!'
    }
  },
  {
    id: 'mini-submersible-pump',
    name: 'Mini Submersible DC Water Pump (3V - 6V)',
    aliases: ['Water Pump', 'Mini Water Pump', 'Submersible Pump 5V', 'DC Water Pump'],
    category: 'Actuator & Motor',
    modelNumber: 'JT-DC3W (Horizontal / Vertical)',
    visual_features: [
      'Small black plastic cylinder with water intake inlet at bottom and cylindrical discharge pipe nozzle on side',
      'Fully sealed epoxy waterproof body with two wire leads (red + / black -)',
      'Submersible in water (IP68)'
    ],
    working_principle: 'Centrifugal impeller pump driven by a sealed miniature DC brushless/brushed motor. Rotation forces liquid outwards through centrifugal force, creating suction at inlet.',
    scientific_principle: 'Bernoulli\'s principle and centrifugal fluid dynamics.',
    what_is_it: 'A miniature DC water pump for pumping water through silicone tubing.',
    what_it_does: 'Pumps water at ~80-120 liters/hour to water plants in smart agriculture systems.',
    inputs: 'DC Voltage (3V - 6V) applied across red (+) and black (-) wires.',
    outputs: 'Pressurized water discharge through nozzle.',
    pins: [
      { name: 'Red (+)', type: 'Power', description: 'Positive supply (+3V to +6V DC)' },
      { name: 'Black (-)', type: 'Ground', description: 'Negative ground' }
    ],
    voltage: '2.5V - 6V DC (Optimal 5V)',
    operating_voltage_min: 2.5,
    operating_voltage_max: 6.0,
    current: 'Operating current: ~150mA - 300mA; Stall/Starting: ~500mA',
    max_current_draw_ma: 500,
    logic_level: 'N/A (Power load)',
    interfaces: ['Relay Module or Motor Driver / Power MOSFET'],
    compatible_boards: ['Arduino UNO (via relay or transistor)', 'ESP32 (via relay)'],
    common_projects: ['Automatic Plant Watering System', 'Smart Farm Irrigation', 'Hydroponics Controller', 'Pet Water Dispenser'],
    required_drivers: ['Controlled via digital pin triggering a relay or transistor'],
    safety: [
      'NEVER connect the water pump directly to an Arduino GPIO pin! The pump requires ~250mA, which will immediately destroy the pin (limit 20mA).',
      'Always switch the pump using a 5V relay module or a transistor with a flyback diode (1N4007).',
      'Do not run the pump dry for extended periods as water lubricates the internal shaft.'
    ],
    never_connect_to: ['Direct Arduino or ESP32 GPIO pin', 'Running dry for more than 10 seconds'],
    fun_fact: 'Centrifugal pumps are the most widely used pumps in the world, from artificial hearts to rocket fuel injectors!',
    student_summary: {
      simple_definition: 'A tiny waterproof pump that pushes water through silicone tubing to water your plants.',
      how_it_works_kid: 'A miniature spinning fan inside sucks water in from the bottom and shoots it out the side pipe.',
      why_we_use_it: 'To build automatic plant watering and drip irrigation systems for gardens.',
      golden_safety_rule: 'Never plug the pump into Arduino pins directly—always use a relay switch in between!'
    }
  },
  {
    id: 'pca9685-servo-driver',
    name: 'PCA9685 16-Channel 12-bit PWM Servo Driver',
    aliases: ['PCA9685', '16-channel Servo Driver', 'I2C PWM Driver'],
    category: 'Driver & Controller',
    modelNumber: 'PCA9685 (I2C)',
    visual_features: [
      'Blue rectangular PCB with 16 sets of 3-pin headers (Signal, V+, GND) in color-coded rows (Yellow, Red, Black)',
      'Large green 2-pin screw terminal block at one end for external V+ servo power',
      'PCA9685 TSSOP IC in center',
      'I2C 6-pin header on both ends for daisy chaining (VCC, GND, SCL, SDA, OE, V+)',
      'Solder jumpers (A0-A5) for setting I2C addresses'
    ],
    working_principle: 'I2C-bus controlled 16-channel LED/servo controller. Each channel has an independent 12-bit resolution (4096 steps) PWM generator running at frequencies from 24Hz to 1526Hz with fully offloaded timing.',
    scientific_principle: 'Digital I2C communication offloading pulse-width modulation timing from CPU to dedicated clock registers.',
    what_is_it: 'An expansion board that lets you control up to 16 servos using just 2 I2C pins (SDA and SCL) on your microcontroller.',
    what_it_does: 'Provides silky-smooth jitter-free PWM signals to multiple servo motors without loading the microcontroller processor.',
    inputs: 'I2C commands on SDA and SCL from Arduino or ESP32.',
    outputs: '16 separate 12-bit PWM output channels (0 to 15).',
    pins: [
      { name: 'VCC', type: 'Power', description: 'Logic power (3.3V or 5V)' },
      { name: 'GND', type: 'Ground', description: 'Logic and power ground' },
      { name: 'SDA', type: 'I2C', description: 'I2C Data line (connects to A4 on Uno or GPIO21 on ESP32)' },
      { name: 'SCL', type: 'I2C', description: 'I2C Clock line (connects to A5 on Uno or GPIO22 on ESP32)' },
      { name: 'V+ (Terminal)', type: 'Power', description: 'External high-current power for servos (5V-6V DC)' }
    ],
    voltage: 'Logic: 3.3V - 5V; Servo V+: up to 6V DC',
    operating_voltage_min: 3.3,
    operating_voltage_max: 5.5,
    current: 'Logic: ~10mA; Servos: up to 10A via terminal',
    max_current_draw_ma: 10,
    logic_level: '3.3V / 5V tolerant',
    interfaces: ['I2C (Default address 0x40)'],
    compatible_boards: ['Arduino UNO', 'ESP32', 'micro:bit'],
    common_projects: ['Robotic Arm (4 to 6 DOF)', 'Hexapod Walking Robot', 'Pan-Tilt Gimbal Array', 'Mechanical Loader'],
    required_drivers: ['Adafruit PWM Servo Driver Library'],
    safety: [
      'ALWAYS supply external power (5V 2A-4A) to the green screw terminal for servos; never power multiple servos from the logic VCC pin!',
      'Make sure polarities (+ and -) on the screw terminal are correct.'
    ],
    never_connect_to: ['Powering 16 servos through Arduino 5V pin'],
    fun_fact: 'Because you can chain 62 of these boards on one I2C bus, you could theoretically control 992 servos from a single Arduino!',
    student_summary: {
      simple_definition: 'A super-controller board that lets you control up to 16 robot servo motors with only two wires.',
      how_it_works_kid: 'Instead of the Arduino having to remember 16 different angles at once, this chip remembers them all and keeps the pulses steady.',
      why_we_use_it: 'Whenever you want to build robot arms with multiple joints or spider walking robots.',
      golden_safety_rule: 'Always connect a separate battery to the green screw terminal for the motors!'
    }
  },

  // --- PASSIVES & SEMICONDUCTORS ---
  {
    id: 'resistor-assortment',
    name: 'Resistor Assortment (220Ω - 1MΩ)',
    aliases: ['Resistors', '220 ohm resistor', '1k resistor', '10k resistor', 'Carbon Film Resistor'],
    category: 'Passive & Semiconductor',
    modelNumber: '1/4W 5% Carbon Film / Metal Film',
    visual_features: [
      'Small beige, blue, or brown cylindrical ceramic body with 4 or 5 colored bands',
      'Two axial silver tinned wire leads',
      'Common color codes: 220Ω (Red-Red-Brown-Gold), 330Ω (Orange-Orange-Brown-Gold), 1kΩ (Brown-Black-Red-Gold), 10kΩ (Brown-Black-Orange-Gold)'
    ],
    working_principle: 'Provides a specified electrical resistance according to Ohm\'s Law: V = I × R, limiting current flow and dropping excess voltage.',
    scientific_principle: 'Drude model of electron scattering against lattice ions in resistive carbon/metal film substrate.',
    what_is_it: 'A passive two-terminal electrical component that limits the flow of electric current.',
    what_it_does: 'Protects LEDs from burning out, creates voltage dividers with sensors, and pulls pins to stable HIGH/LOW levels.',
    inputs: 'Electric current from circuit.',
    outputs: 'Reduced current / voltage drop, dissipating heat.',
    pins: [
      { name: 'Lead 1', type: 'Passive', description: 'Non-polarized lead' },
      { name: 'Lead 2', type: 'Passive', description: 'Non-polarized lead' }
    ],
    voltage: 'Rated up to 250V; Power rating 0.25W (1/4 Watt)',
    operating_voltage_min: 0,
    operating_voltage_max: 250,
    current: 'Calculated by I = V / R',
    max_current_draw_ma: 100,
    logic_level: 'Passive',
    interfaces: ['Breadboard / Through-hole'],
    compatible_boards: ['All microcontrollers and discrete circuits'],
    common_projects: ['LED Current Limiter', 'LDR Voltage Divider', 'Pushbutton Pull-up/down', 'RC Timing with 555'],
    required_drivers: ['None'],
    safety: [
      'ALWAYS place a 220Ω - 330Ω resistor in series with an LED when connected to 5V! Connecting an LED directly without a resistor will burn it out within seconds.',
      'Check power dissipation (P = V² / R or I²R) so you do not exceed 0.25W.'
    ],
    never_connect_to: ['LED directly to 5V without a series resistor'],
    fun_fact: 'The mnemonic "BBROYGBVGW" (Bad Boys Ring Our Young Girls But Violet Gives Willingly) helps recall the 0-9 color codes!',
    student_summary: {
      simple_definition: 'A tiny traffic controller for electricity that slows down the current so delicate parts do not explode.',
      how_it_works_kid: 'Inside is a resistive material that acts like a narrow pipe, preventing too much electricity from rushing through all at once.',
      why_we_use_it: 'To keep LEDs from burning out and to help sensors make readable voltage signals.',
      golden_safety_rule: 'Never plug an LED directly across 5V and GND without a 220Ω resistor!'
    }
  },
  {
    id: 'led-assortment',
    name: 'LED Assortment (3mm & 5mm Multi-color)',
    aliases: ['LEDs', 'Light Emitting Diode', 'Red LED', 'Green LED', 'Yellow LED', 'Blue LED'],
    category: 'Passive & Semiconductor',
    modelNumber: 'Standard 5mm / 3mm Diffused / Water Clear',
    visual_features: [
      'Colored or clear domed epoxy plastic lens with flat rim edge on cathode side',
      'Two wire leads: Longer lead is Anode (+), shorter lead is Cathode (-)',
      'Inside the lens: Large anvil flag is Cathode (-), smaller post is Anode (+)'
    ],
    working_principle: 'Solid-state semiconductor PN junction. When forward-biased, electrons recombine with electron holes within the depletion region, releasing energy in the form of photons (electroluminescence).',
    scientific_principle: 'Spontaneous emission of light via bandgap electron-hole radiative recombination.',
    what_is_it: 'A light-emitting semiconductor diode that emits light when current flows through it in the forward direction.',
    what_it_does: 'Provides visual status indicators, signals, and decorative lighting.',
    inputs: 'Forward DC voltage and current.',
    outputs: 'Visible light and slight heat.',
    pins: [
      { name: 'Anode (+)', type: 'Passive', description: 'Longer lead, connect to positive voltage via series resistor' },
      { name: 'Cathode (-)', type: 'Ground', description: 'Shorter lead with flat spot on rim, connect to Ground' }
    ],
    voltage: 'Forward drop: Red/Yellow ~1.8V-2.2V; Green ~2.2V-2.4V; Blue/White ~3.0V-3.4V',
    operating_voltage_min: 1.8,
    operating_voltage_max: 3.4,
    current: 'Recommended forward current: 10mA - 20mA (max 30mA)',
    max_current_draw_ma: 20,
    logic_level: 'Forward biased DC',
    interfaces: ['Digital GPIO via series resistor'],
    compatible_boards: ['Arduino UNO', 'ESP32', 'micro:bit'],
    common_projects: ['Blink Tutorial', 'Traffic Light Controller', 'Binary Counter', 'PWM Mood Lamp'],
    required_drivers: ['None, standard digitalWrite() or analogWrite()'],
    safety: [
      'NEVER connect directly across a power supply or battery without a current-limiting resistor! It will pop with smoke and burn out immediately.',
      'Mind the polarity: Anode is positive (long leg), Cathode is negative (short leg).'
    ],
    never_connect_to: ['Direct 5V or 9V without resistor', 'Reverse bias > 5V'],
    fun_fact: 'The first visible LED was invented in 1962 by Nick Holonyak Jr. while working at General Electric!',
    student_summary: {
      simple_definition: 'A tiny electronic light bulb that turns electricity directly into light without getting hot.',
      how_it_works_kid: 'Electricity jumps across a tiny crystal inside, creating little flashes of light called photons.',
      why_we_use_it: 'To see when our circuits are working, build traffic lights, and indicate status.',
      golden_safety_rule: 'Long leg is positive (+), short leg is negative (-), and ALWAYS use a resistor!'
    }
  },
  {
    id: 'diode-1n4007',
    name: '1N4007 Rectifier Diode',
    aliases: ['1N4007', 'Rectifier Diode', 'Flyback Diode', '1A Diode'],
    category: 'Passive & Semiconductor',
    modelNumber: '1N4007',
    visual_features: [
      'Small black cylindrical plastic package (DO-41)',
      'Prominent silver or white printed band at one end indicating the Cathode (-)',
      'Two axial silver leads'
    ],
    working_principle: 'Semiconductor PN junction that allows current to flow easily in only one direction (forward bias) while blocking current in the reverse direction up to 1000V.',
    scientific_principle: 'Unidirectional charge carrier diffusion across a PN depletion zone with ~0.7V forward silicon barrier potential.',
    what_is_it: 'A standard 1 Amp silicon rectifier diode.',
    what_it_does: 'Protects circuits against reverse polarity and absorbs inductive voltage spikes (flyback protection) across coils and relays.',
    inputs: 'Forward or reverse biased voltage.',
    outputs: 'Unidirectional current flow with ~0.7V forward voltage drop.',
    pins: [
      { name: 'Anode (+)', type: 'Passive', description: 'Positive side (unbanded end)' },
      { name: 'Cathode (-)', type: 'Passive', description: 'Negative side (end with silver band)' }
    ],
    voltage: 'Peak Reverse Voltage (PIV): 1000V; Forward drop: ~0.7V - 1.0V',
    operating_voltage_min: 0,
    operating_voltage_max: 1000,
    current: 'Max forward continuous current: 1.0A',
    max_current_draw_ma: 1000,
    logic_level: 'Passive semiconductor',
    interfaces: ['Through-hole breadboard'],
    compatible_boards: ['All electronics and power supply circuits'],
    common_projects: ['AC to DC Rectifier', 'Flyback Diode across Relay Coil', 'Reverse Battery Protection', 'Solar Diode Isolator'],
    required_drivers: ['None'],
    safety: [
      'Install with correct polarity. The silver band indicates the Cathode (-) terminal.',
      'When used as a flyback diode across a motor/relay coil, connect the Cathode (silver band) to positive power and Anode to ground/collector.'
    ],
    never_connect_to: ['Direct power short circuit'],
    fun_fact: 'The word "diode" comes from Greek "di" (two) and "ode" (path), meaning a two-pathway device!',
    student_summary: {
      simple_definition: 'A one-way street valve for electric current.',
      how_it_works_kid: 'Electricity can only march forward in the direction of the arrow. If it tries to go backward, the diode slams the door shut!',
      why_we_use_it: 'To protect our circuits if someone puts the battery in backwards, and to catch dangerous voltage kicks from motor coils.',
      golden_safety_rule: 'The silver stripe marks the exit (Cathode negative side)!'
    }
  },
  {
    id: 'transistor-bc547',
    name: 'BC547 NPN Bipolar Junction Transistor',
    aliases: ['BC547', 'NPN Transistor', 'BC547B', 'BJT'],
    category: 'Passive & Semiconductor',
    modelNumber: 'BC547 (TO-92)',
    visual_features: [
      'Small black plastic D-shaped semi-cylindrical package (TO-92)',
      'Flat front face with "BC547" printed in white or laser-etched',
      'Three inline thin metal leads: Looking at flat face with leads pointing down: Pin 1 = Collector (C), Pin 2 = Base (B), Pin 3 = Emitter (E)'
    ],
    working_principle: 'Current-controlled amplifier/switch. A small base-emitter current (Ib) controls a much larger collector-emitter current (Ic) according to the current gain β (hFE ~110-800).',
    scientific_principle: 'Bipolar charge transport where base current modulates the barrier potential allowing minority carriers to diffuse from emitter to collector.',
    what_is_it: 'A general-purpose NPN transistor used as an electronic switch or signal amplifier.',
    what_it_does: 'Allows a tiny microcontroller GPIO pin (supplying ~2mA) to switch on an LED, buzzer, or small relay (drawing up to 100mA).',
    inputs: 'Base current (through a series base resistor like 1kΩ - 10kΩ).',
    outputs: 'Switched collector-emitter conduction to ground (low-side switch).',
    pins: [
      { name: 'Pin 1: Collector (C)', type: 'Passive', description: 'Connected to the negative side of the load' },
      { name: 'Pin 2: Base (B)', type: 'Passive', description: 'Control terminal (always wire through a 1k-10k base resistor!)' },
      { name: 'Pin 3: Emitter (E)', type: 'Ground', description: 'Connected to circuit Ground' }
    ],
    voltage: 'Vceo max: 45V; Vbe forward: ~0.7V',
    operating_voltage_min: 0,
    operating_voltage_max: 45,
    current: 'Max collector current Ic: 100mA continuous',
    max_current_draw_ma: 100,
    logic_level: 'Base threshold ~0.7V',
    interfaces: ['Breadboard / Through-hole'],
    compatible_boards: ['Arduino UNO', 'ESP32', 'micro:bit'],
    common_projects: ['Buzzer Driver Circuit', 'Relay Switching Stage', 'Touch Sensor Switch', 'Microphone Preamp', 'Automatic Night Light'],
    required_drivers: ['None, triggered via digital pin'],
    safety: [
      'NEVER connect the Base pin directly to an Arduino 5V pin without a base resistor (1kΩ-10kΩ)! Without a resistor, excessive base current will instantly destroy the transistor.',
      'Maximum collector current is 100mA. Do not attempt to drive heavy BO motors (which need ~800mA) with a BC547.'
    ],
    never_connect_to: ['Base directly to 5V without a base resistor', 'Heavy loads exceeding 100mA'],
    fun_fact: 'The invention of the transistor at Bell Labs in 1947 is considered one of the greatest inventions of the 20th century, enabling all modern computers!',
    student_summary: {
      simple_definition: 'An electric tap or valve: a tiny trickle of electricity at the handle opens a big flow through the pipe.',
      how_it_works_kid: 'When you feed a tiny puff of current into the middle pin (Base), it lets a much bigger current rush from the top pin (Collector) to the bottom pin (Emitter).',
      why_we_use_it: 'To turn on buzzers, lights, and switches using tiny control signals from computer pins.',
      golden_safety_rule: 'Always put a 1k or 10k resistor in front of the middle Base pin!'
    }
  },
  {
    id: 'ne555-timer-ic',
    name: 'NE555 Precision Timer IC',
    aliases: ['555 Timer', 'NE555', 'Timer IC', '555 Oscillator'],
    category: 'Passive & Semiconductor',
    modelNumber: 'NE555P / LM555 (DIP-8)',
    visual_features: [
      'Black rectangular plastic 8-pin dual in-line package (DIP-8)',
      'Circular indentation / notch at pin 1 end',
      'Text "NE555P" or similar printed in white on top',
      '4 pins on left side (1-4) and 4 pins on right side (5-8)'
    ],
    working_principle: 'Contains an internal voltage divider of three matched 5kΩ resistors (giving it the name "555"), two voltage comparators (trigger and threshold), an RS flip-flop, and a discharge transistor to generate precision timing pulses and oscillations.',
    scientific_principle: 'RC charging and discharging curves exponential dynamics: V(t) = V0(1 - e^(-t/RC)). Operates in Astable (oscillator), Monostable (one-shot pulse), and Bistable (flip-flop) modes.',
    what_is_it: 'The most popular integrated circuit in history, used for pulse generation, delays, and tone synthesis.',
    what_it_does: 'Creates blinking LED flashers, beeping audio tones, timing delays, and clock pulses without needing any code or microcontroller.',
    inputs: 'Trigger (Pin 2), Threshold (Pin 6), Reset (Pin 4), Control Voltage (Pin 5).',
    outputs: 'Output (Pin 3, can sink or source up to 200mA), Discharge (Pin 7).',
    pins: [
      { name: 'Pin 1 (GND)', type: 'Ground', description: 'Ground' },
      { name: 'Pin 2 (TRIG)', type: 'Digital Input', description: 'Trigger input (< 1/3 VCC sets output HIGH)' },
      { name: 'Pin 3 (OUT)', type: 'Digital Output', description: 'High-current output (up to 200mA)' },
      { name: 'Pin 4 (RESET)', type: 'Digital Input', description: 'Active-low reset (connect to VCC if unused)' },
      { name: 'Pin 5 (CTRL)', type: 'Passive', description: 'Control voltage (typically 10nF cap to GND)' },
      { name: 'Pin 6 (THRES)', type: 'Analog Input', description: 'Threshold input (> 2/3 VCC resets output LOW)' },
      { name: 'Pin 7 (DISCH)', type: 'Passive', description: 'Discharge transistor pin for timing capacitor' },
      { name: 'Pin 8 (VCC)', type: 'Power', description: 'Supply voltage (+4.5V to +15V DC)' }
    ],
    voltage: '4.5V - 15V DC (16V absolute max)',
    operating_voltage_min: 4.5,
    operating_voltage_max: 15.0,
    current: 'Quiescent current: 3mA-10mA; Output current sink/source: up to 200mA',
    max_current_draw_ma: 200,
    logic_level: 'Ratiometric to supply voltage',
    interfaces: ['Breadboard DIP-8'],
    compatible_boards: ['Standalone discrete circuit, can clock Arduino interrupt pins'],
    common_projects: ['Astable LED Flasher', 'Police Siren Sound Generator', 'PWM Motor Speed Controller', 'Touch-Activated Delay Switch'],
    required_drivers: ['None (pure hardware IC, zero programming required)'],
    safety: [
      'Pin 1 is marked by the small circular dot or to the left of the notch.',
      'Always connect Pin 4 (RESET) to Pin 8 (VCC) if not actively using the reset feature, or the IC may float in reset state.'
    ],
    never_connect_to: ['Voltages > 16V', 'Direct short of Pin 3 to VCC/GND'],
    fun_fact: 'Designed by Hans Camenzind in 1971 for Signetics, over one billion 555 timer chips are still manufactured every single year!',
    student_summary: {
      simple_definition: 'A magical timer chip that makes LEDs blink and buzzers play musical sounds without any programming.',
      how_it_works_kid: 'Inside are three 5,000-ohm resistors that divide voltage into thirds, watching an external capacitor fill up like a bucket of water and dump it out rhythmically.',
      why_we_use_it: 'To build clocks, sirens, flashers, and timers without needing a computer.',
      golden_safety_rule: 'Check the little round dot on the corner so you do not plug the chip in backwards!'
    }
  },
  {
    id: 'l293d-motor-driver-ic',
    name: 'L293D Quadruple Half-H Motor Driver IC',
    aliases: ['L293D', 'Motor Driver IC', 'DIP-16 Motor Driver'],
    category: 'Driver & Controller',
    modelNumber: 'L293D (DIP-16)',
    visual_features: [
      'Long black rectangular plastic 16-pin package (DIP-16)',
      'Notch at pin 1 end with "L293D" stamped on top',
      'Pins 4, 5, 12, 13 are joined together internally as heatsink grounds'
    ],
    working_principle: 'Quadruple high-current half-H driver containing internal clamp flyback diodes. Can drive two bidirectional DC motors up to 600mA per channel with logic isolation.',
    scientific_principle: 'Bidirectional inductive load driving with internal back-EMF suppression diodes.',
    what_is_it: 'A compact 16-pin motor driver chip for breadboard prototyping.',
    what_it_does: 'Drives two small DC motors forward and backward directly on a breadboard.',
    inputs: 'Logic 1A, 2A, 3A, 4A, Enable 1,2 and Enable 3,4.',
    outputs: 'High current motor drive lines 1Y, 2Y, 3Y, 4Y.',
    pins: [
      { name: 'VCC1 (Pin 16)', type: 'Power', description: '5V Logic Supply' },
      { name: 'VCC2 (Pin 8)', type: 'Power', description: 'Motor Power Supply (4.5V to 36V)' },
      { name: 'GND (Pins 4,5,12,13)', type: 'Ground', description: 'Ground & Heat sink' },
      { name: '1A, 2A (Pins 2,7)', type: 'Digital Input', description: 'Motor 1 direction logic' },
      { name: '1Y, 2Y (Pins 3,6)', type: 'Digital Output', description: 'Motor 1 terminals' }
    ],
    voltage: 'Logic: 5V; Motor: 4.5V - 36V',
    operating_voltage_min: 4.5,
    operating_voltage_max: 36.0,
    current: '600mA continuous per channel (1.2A peak)',
    max_current_draw_ma: 600,
    logic_level: '5V TTL',
    interfaces: ['Breadboard DIP-16'],
    compatible_boards: ['Arduino UNO', 'micro:bit', 'ESP32'],
    common_projects: ['Breadboard Robot Car', 'Dual DC Motor Controller', 'Stepper Motor Driver'],
    required_drivers: ['None'],
    safety: ['Chip can become warm when driving motors above 400mA; solder heatsink leads or stick miniature heatsink if running continuously.'],
    never_connect_to: ['Motors drawing > 600mA continuous'],
    fun_fact: 'The "D" in L293D means it has built-in Diodes, protecting it from motor inductive kickback without needing external 1N4007s!',
    student_summary: {
      simple_definition: 'A motor driver chip you can plug directly into a breadboard to drive two robot motors.',
      how_it_works_kid: 'It acts like four electronic power gates that switch battery power into motor coils without letting spikes reach your Arduino.',
      why_we_use_it: 'To build clean breadboard circuits for small robots.',
      golden_safety_rule: 'Connect pins 4, 5, 12, and 13 to Ground because they also cool the chip down!'
    }
  },

  // --- POWER & BATTERIES ---
  {
    id: 'battery-18650-liion',
    name: '18650 Li-ion Rechargeable Battery (3.7V ~2500mAh)',
    aliases: ['18650 Cell', 'Li-ion Battery', '3.7V Battery', '18650'],
    category: 'Power & Battery',
    modelNumber: '18650 Cylindrical Cell',
    visual_features: [
      'Large cylindrical battery (18mm diameter x 65mm length, larger than AA)',
      'Brightly colored PVC heat shrink wrap (blue, green, or pink)',
      'Flat or slightly raised positive terminal button; flat metal negative base terminal'
    ],
    working_principle: 'Lithium-ion intercalation chemistry. Lithium ions move from the negative electrode (graphite) to the positive electrode (lithium metal oxide) during discharge, generating ~3.7V nominal.',
    scientific_principle: 'Electrochemical potential and reversible redox intercalation reactions with very high energy density.',
    what_is_it: 'A high-capacity rechargeable lithium-ion cell commonly used in laptops, electric vehicles, and robotics.',
    what_it_does: 'Provides high-discharge current (several amps) to motors, servos, and microcontrollers for hours of runtime.',
    inputs: 'Constant-Current / Constant-Voltage (CC/CV) lithium charging at max 4.2V.',
    outputs: 'Nominal 3.7V DC (4.2V fully charged, 3.0V discharged cutoff).',
    pins: [
      { name: 'Positive (+)', type: 'Power', description: 'Positive button terminal (+3.7V)' },
      { name: 'Negative (-)', type: 'Ground', description: 'Negative flat base (0V Ground)' }
    ],
    voltage: 'Nominal 3.7V (Range: 3.0V cut-off to 4.2V full charge)',
    operating_voltage_min: 3.0,
    operating_voltage_max: 4.2,
    current: 'Continuous discharge up to 5A-10A; capacity ~2500mAh',
    max_current_draw_ma: 5000,
    logic_level: 'DC Power source',
    interfaces: ['18650 Battery Holder with leads'],
    compatible_boards: ['Powers L298N (2 cells = 7.4V), DC-DC Buck converters, Arduino VIN'],
    common_projects: ['Autonomous Robot Car Power Pack', 'Portable ESP32 IoT Station', 'High-Torque Servo Power'],
    required_drivers: ['Requires dedicated Li-ion charger (e.g. TP4056 or smart charger)'],
    safety: [
      'STRICT LAB SAFETY WARNING: Li-ion cells store enormous chemical energy! NEVER short-circuit the positive and negative terminals (leads to extreme heat, fire, or explosion).',
      'NEVER charge with an ordinary DC power supply or 9V battery charger; use only certified CC/CV Li-ion chargers.',
      'Do not discharge below 3.0V or the cell may be permanently damaged.',
      'Inspect wrapper for tears before use; if wrapper is torn, do not insert into metal holders.'
    ],
    never_connect_to: ['Direct short circuit between + and -', 'Unregulated 9V or 12V charging sources'],
    fun_fact: 'The name "18650" describes its physical dimensions: 18mm in diameter, 65mm in length, and 0 denotes a cylindrical shape!',
    student_summary: {
      simple_definition: 'A powerful rechargeable battery that powers robot motors and portable science kits.',
      how_it_works_kid: 'Tiny lithium atoms move between chemical plates inside, pushing lots of electric current out to turn heavy robot wheels.',
      why_we_use_it: 'Because small 9V batteries die in 5 minutes when running motors, but 18650 cells can run your robot all afternoon!',
      golden_safety_rule: 'DANGER: Never let the metal ends touch directly with a wire, and only recharge in an approved battery charger under teacher supervision!'
    }
  },
  {
    id: 'battery-9v-snap',
    name: '9V Alkaline/Heavy Duty Battery + Snap Connector',
    aliases: ['9V Battery', '9V Snap', 'PP3 Battery', 'Transistor Battery'],
    category: 'Power & Battery',
    modelNumber: '6LR61 / 6F22 9V',
    visual_features: [
      'Rectangular metal-cased battery with rounded corners',
      'Two snap terminals on top: smaller octagonal male stud (+), larger circular female socket (-)',
      'Black vinyl snap connector with red (+9V) and black (GND) wires, or 2.1mm DC barrel plug'
    ],
    working_principle: 'Primary electrochemical cell composed of six 1.5V cells in series inside a single enclosure.',
    scientific_principle: 'Alkaline (Zinc-Manganese Dioxide) galvanic reduction-oxidation reactions.',
    what_is_it: 'A standard 9V portable battery with clip-on connector.',
    what_it_does: 'Provides a convenient 9V supply for the Arduino DC barrel jack or VIN pin for stationary bench testing.',
    inputs: 'None (Primary non-rechargeable battery).',
    outputs: '9V DC (drops under heavy load).',
    pins: [
      { name: 'Red Lead (+)', type: 'Power', description: '+9V DC' },
      { name: 'Black Lead (-)', type: 'Ground', description: 'Ground reference (0V)' }
    ],
    voltage: '9V DC nominal',
    operating_voltage_min: 7.0,
    operating_voltage_max: 9.6,
    current: 'Low current capability (~300mAh - 500mAh total; max continuous ~100mA)',
    max_current_draw_ma: 100,
    logic_level: 'DC Power',
    interfaces: ['DC Barrel Jack (2.1mm center positive) or breadboard pins'],
    compatible_boards: ['Arduino UNO (via DC Barrel Jack or VIN)', 'Standalone circuits'],
    common_projects: ['Arduino Uno standalone demo', 'Multimeter power', '555 timer bench testing'],
    required_drivers: ['None'],
    safety: [
      'NOT SUITABLE FOR MOTORS: A standard 9V battery has very high internal resistance and CANNOT deliver the 1A-2A required by robot motors; it will collapse to ~4V and die within minutes.',
      'Use 9V only for microcontrollers, sensors, and low-power circuits.'
    ],
    never_connect_to: ['Directly to BO motors or high-power servos', 'Directly to 5V or 3.3V pins (will instantly fry the board!)'],
    fun_fact: 'A 9V battery actually contains six tiny 1.5V AAAA cells packed tightly together inside its rectangular case!',
    student_summary: {
      simple_definition: 'A rectangular battery that clips onto an Arduino to power it without a computer cable.',
      how_it_works_kid: 'Six miniature battery cells inside are stacked together in series to add up to 9 volts.',
      why_we_use_it: 'Great for powering an Arduino and reading sensors while walking around.',
      golden_safety_rule: 'Never use a 9V battery to power heavy robot motors; it cannot handle the heavy push and will drain flat immediately!'
    }
  },
  {
    id: 'dc-dc-buck-converter-5v',
    name: 'DC-DC Buck Converter (5V Output Step-Down)',
    aliases: ['Buck Converter', 'Step Down Regulator', 'LM2596 Module', '5V Buck'],
    category: 'Driver & Controller',
    modelNumber: 'LM2596S / Mini-360 5V Step-Down',
    visual_features: [
      'Small blue or green PCB with large round toroidal inductor or shielded ferrite coil',
      'Input pads (IN+, IN-) and Output pads (OUT+, OUT-)',
      'Small brass screw on blue multi-turn trimmer potentiometer (or fixed 5V solder jumper on back)',
      'Large electrolytic filtering capacitors'
    ],
    working_principle: 'High-efficiency switch-mode power supply (SMPS). A MOSFET or transistor switches input DC at high frequency (typically 150kHz) through an inductor and capacitor, stepping down voltage with over 85% energy efficiency without excessive heat.',
    scientific_principle: 'Faraday\'s Law of induction and energy storage in inductor magnetic fields with high-frequency PWM switching.',
    what_is_it: 'An efficient voltage step-down module that drops higher battery voltages (7.4V - 24V) cleanly to 5.0V.',
    what_it_does: 'Provides a solid, stable 5V rail (up to 2A-3A) to power multiple SG90 servos, ESP32 boards, or sensors from an 18650 battery pack.',
    inputs: 'DC Voltage (4.5V - 28V) on IN+ and IN-.',
    outputs: 'Regulated 5V DC (up to 3A) on OUT+ and OUT-.',
    pins: [
      { name: 'IN+', type: 'Power', description: 'Positive input from battery (+7.4V to +24V)' },
      { name: 'IN-', type: 'Ground', description: 'Negative input Ground' },
      { name: 'OUT+', type: 'Power', description: 'Regulated +5.0V output' },
      { name: 'OUT-', type: 'Ground', description: 'Regulated 0V Ground' }
    ],
    voltage: 'Input: 4.5V - 28V DC; Output: 5.0V DC regulated',
    operating_voltage_min: 4.5,
    operating_voltage_max: 28.0,
    current: 'Continuous output current: up to 2A (3A peak with heatsink)',
    max_current_draw_ma: 3000,
    logic_level: 'Power supply rail',
    interfaces: ['Solder pads / screw terminals'],
    compatible_boards: ['Arduino 5V pin', 'ESP32 5V VIN', 'Servos', 'Raspberry Pi'],
    common_projects: ['Robot Central Power Rail', 'High-current Servo Supply', 'Battery Management System'],
    required_drivers: ['None'],
    safety: [
      'CRITICAL: If using an adjustable LM2596 module, ALWAYS measure the output with a digital multimeter and adjust the brass screw to exactly 5.0V BEFORE connecting your Arduino or ESP32! Connecting unadjusted 12V output will destroy all your boards.',
      'Check input polarity: Reversing IN+ and IN- will immediately blow the chip.'
    ],
    never_connect_to: ['Connecting to microcontroller before measuring output voltage with a multimeter!'],
    fun_fact: 'Unlike traditional linear regulators (like 7805) that waste extra voltage as burning heat, buck converters are over 90% energy efficient!',
    student_summary: {
      simple_definition: 'A high-efficiency electrical transformer that steps down strong battery voltage into a safe 5V.',
      how_it_works_kid: 'It switches power on and off hundreds of thousands of times a second into a magnetic coil, giving steady 5V without wasting battery power as heat.',
      why_we_use_it: 'To safely feed 5V to computer brains and servos from big 7.4V or 12V battery packs.',
      golden_safety_rule: 'Always test with a multimeter first to verify it outputs exactly 5V before plugging in your microcontroller!'
    }
  },

  // --- PROTOTYPING & HARDWARE ---
  {
    id: 'breadboard-830-point',
    name: 'Full-Size 830-Point Solderless Breadboard',
    aliases: ['Breadboard', '830 Breadboard', 'Solderless Breadboard', 'MB-102'],
    category: 'Prototyping & Tools',
    modelNumber: 'MB-102 830 Tie Points',
    visual_features: [
      'White plastic rectangular block with hundreds of tiny square holes in a 0.1 inch (2.54mm) pitch grid',
      'Dual red (+) and blue/black (-) power distribution bus strips running along both outer edges',
      'Central horizontal division divider trough separating two banks of 5-hole terminal strips (rows 1-63, columns A-E and F-J)',
      'Interlocking tabs on sides and self-adhesive foam backing'
    ],
    working_principle: 'Houses internal nickel-silver spring metal clips. Holes in each 5-hole vertical strip (A-B-C-D-E) are electrically connected underneath. Power rail strips are connected along their entire length.',
    scientific_principle: 'Mechanical spring contact resistance and solderless node prototyping based on Kirchhoff\'s circuit laws.',
    what_is_it: 'A reusable construction base for prototyping electronic circuits without soldering.',
    what_it_does: 'Allows students to quickly plug in resistors, chips, LEDs, and wires to test circuits and reconfigure them in seconds.',
    inputs: 'Component pins and jumper wires inserted into holes.',
    outputs: 'Zero-resistance electrical connections across interconnected rows and buses.',
    pins: [
      { name: 'Red Rail (+)', type: 'Power', description: 'Continuous positive power bus line' },
      { name: 'Blue Rail (-)', type: 'Ground', description: 'Continuous negative ground bus line' },
      { name: 'Rows (A-E / F-J)', type: 'Passive', description: '5 connected tie-points per half row' }
    ],
    voltage: 'Rated up to 30V DC',
    operating_voltage_min: 0,
    operating_voltage_max: 30,
    current: 'Max recommended current per tie point: ~1A',
    max_current_draw_ma: 1000,
    logic_level: 'Passive interconnect',
    interfaces: ['Standard 2.54mm (0.1") pin pitch'],
    compatible_boards: ['Arduino UNO jumpers', 'ESP32 (straddles center trough)', 'DIP ICs (NE555, L293D)'],
    common_projects: ['Every breadboard lab circuit', 'LED circuits', 'Sensor testing', '555 timer flasher'],
    required_drivers: ['None'],
    safety: [
      'Never insert wires carrying more than 1 Amp or line voltage (230V AC) into a breadboard!',
      'Watch out for the split in the power rails on some breadboards (a break in the colored line in the middle means left and right halves are disconnected until jumpered).'
    ],
    never_connect_to: ['Mains 230V electricity', 'Currents > 1.5A (will melt plastic clips)'],
    fun_fact: 'In the early 1900s, radio hobbyists literally hammered copper nails into wooden kitchen bread-cutting boards to build circuits!',
    student_summary: {
      simple_definition: 'A plastic board with secret metal clips underneath where you can plug parts in without soldering.',
      how_it_works_kid: 'Each set of 5 holes in a row is secretly joined together by springy metal strips hidden inside the plastic.',
      why_we_use_it: 'So you can build, fix, and change circuits in seconds without needing a hot soldering iron.',
      golden_safety_rule: 'Never plug parts across the same 5-hole strip unless you want them connected together!'
    }
  },
  {
    id: 'chassis-2wd-robot',
    name: '2WD Smart Robot Car Chassis Kit',
    aliases: ['Robot Chassis', '2WD Chassis', 'Car Chassis', 'Robot Base'],
    category: 'Robotics & Mechanical',
    modelNumber: '2WD Smart Car Acrylic Chassis',
    visual_features: [
      'Laser-cut transparent or black acrylic base plate with pre-drilled mounting slots and holes',
      'Two yellow BO gear motors with black mounting brackets and M3 standoffs',
      'Two rubber-tread wheels with white plastic hubs',
      'One metal or plastic omnidirectional swivel caster wheel mounted at the front/rear',
      'Cutouts for power switch and battery holder'
    ],
    working_principle: 'Differential drive steering platform. By spinning left and right wheels in the same direction, the car moves straight; by spinning them at different speeds or opposite directions, the car rotates on its central axis with support from the caster.',
    scientific_principle: 'Kinematics of differential steering: Angular velocity ω = (v_right - v_left) / wheel_base.',
    what_is_it: 'A two-wheel drive mechanical platform with caster wheel for building mobile robotics projects.',
    what_it_does: 'Provides the mechanical body, motors, and wheels that carry microcontrollers, sensors, and batteries.',
    inputs: 'Motor rotation from left and right BO motors.',
    outputs: 'Holonomic / non-holonomic mobile ground movement.',
    pins: [],
    voltage: 'Mechanical frame',
    current: 'Mechanical frame',
    logic_level: 'Mechanical',
    interfaces: ['M3 screws, motor mounts'],
    compatible_boards: ['Arduino UNO', 'L298N Motor Driver', 'ESP32', 'micro:bit'],
    common_projects: ['Obstacle Avoiding Robot', 'Line Follower Robot', 'Bluetooth RC Car', 'Autonomous Patrol Rover'],
    required_drivers: ['None'],
    safety: ['Ensure screws and motor brackets are tightened firmly with lock nuts so vibrations do not shake parts loose during motion.'],
    never_connect_to: [],
    fun_fact: 'The Mars Exploration Rovers (Spirit & Opportunity) used a specialized 6-wheel rocker-bogie chassis derived from differential robotic principles!',
    student_summary: {
      simple_definition: 'The wheels, frame, and body of your robot car.',
      how_it_works_kid: 'Two motors turn the back wheels separately to steer like a tank, while a smooth swivel ball underneath keeps it balanced.',
      why_we_use_it: 'It gives your electronics wheels so they can drive around on the floor!',
      golden_safety_rule: 'Keep wires tucked and zip-tied so they do not get caught inside the spinning wheels.'
    }
  },
  {
    id: 'lcd-16x2-i2c',
    name: '16x2 Character LCD with I2C Module',
    aliases: ['16x2 LCD', 'I2C LCD', 'LCD Display', 'PCF8574 LCD'],
    category: 'Display & Communication',
    modelNumber: '1602 LCD with PCF8574 Backpack',
    visual_features: [
      'Rectangular display module with dark blue or green reflective screen (16 characters by 2 rows)',
      'Black I2C backpack board soldered to rear 16-pin header',
      'Blue trimmer potentiometer on backpack to adjust screen text contrast',
      '4-pin right-angle header on side labeled GND, VCC, SDA, SCL'
    ],
    working_principle: 'Liquid Crystal Display (LCD) modulating polarized light using liquid crystal molecules. The I2C backpack uses a PCF8574 8-bit I/O expander to control the HD44780 parallel controller over just two I2C wires.',
    scientific_principle: 'Nematic liquid crystal birefringence under electric fields and I2C serial bus protocol (address 0x27 or 0x3F).',
    what_is_it: 'An alphanumeric screen that displays two lines of 16 characters each, connected via simple 2-wire I2C.',
    what_it_does: 'Shows live sensor readings (soil moisture %, temperature °C, distance cm, status messages) clearly to students.',
    inputs: 'I2C commands from microcontroller on SDA and SCL.',
    outputs: 'Visible alphanumeric text and customizable 5x8 pixel icons.',
    pins: [
      { name: 'GND', type: 'Ground', description: 'Ground' },
      { name: 'VCC', type: 'Power', description: '5V DC Power' },
      { name: 'SDA', type: 'I2C', description: 'I2C Data (A4 on Uno, GPIO21 on ESP32)' },
      { name: 'SCL', type: 'I2C', description: 'I2C Clock (A5 on Uno, GPIO22 on ESP32)' }
    ],
    voltage: '5V DC',
    operating_voltage_min: 4.5,
    operating_voltage_max: 5.5,
    current: 'Backlight ON: ~25mA-40mA; Backlight OFF: ~4mA',
    max_current_draw_ma: 40,
    logic_level: '5V TTL (3.3V I2C signals from ESP32 usually read reliably with pull-ups)',
    interfaces: ['I2C (Default address: 0x27 or 0x3F)'],
    compatible_boards: ['Arduino UNO', 'ESP32', 'micro:bit'],
    common_projects: ['Smart Soil Health Monitor', 'Digital Weather Station', 'Ultrasonic Distance Meter', 'Speedometer Display'],
    required_drivers: ['LiquidCrystal_I2C library by Frank de Brabander'],
    safety: [
      'If the screen turns on with blue boxes but no text appears, turn the blue potentiometer on the back with a screwdriver to adjust contrast until letters pop out!'
    ],
    never_connect_to: ['Voltages > 5.5V'],
    fun_fact: 'The original HD44780 controller used inside this LCD has remained virtually unchanged since Hitachi introduced it in 1987!',
    student_summary: {
      simple_definition: 'A digital screen that writes words and numbers from your computer code.',
      how_it_works_kid: 'Tiny liquid crystals twist to block or let light through, forming letters and numbers like a digital alarm clock.',
      why_we_use_it: 'To see your sensor readings (like "Temperature: 24C" or "Watering Plant!") without needing a computer screen.',
      golden_safety_rule: 'If you cannot see text, turn the tiny blue screw on the back to bring the contrast into focus!'
    }
  },
  {
    id: 'digital-multimeter',
    name: 'Digital Multimeter (DMM)',
    aliases: ['Multimeter', 'DMM', 'Volt Meter', 'Digital Meter'],
    category: 'Prototyping & Tools',
    modelNumber: 'DT830D / Standard ATL Multimeter',
    visual_features: [
      'Yellow or black handheld enclosure with large rotary dial in center',
      'Digital 7-segment LCD readout at top',
      'Red (positive) and Black (common ground) test probes with sharp tips',
      'Port jacks labeled COM, VΩmA, and 10A DC'
    ],
    working_principle: 'Measures voltage, current, resistance, continuity (beeper), and diode forward drop using an internal dual-slope ADC and precision reference resistors.',
    scientific_principle: 'Ohm\'s law, voltage division, and current shunt resistance voltage drop measurement.',
    what_is_it: 'The essential diagnostic tool of every science and electronics laboratory.',
    what_it_does: 'Tests battery charge, verifies voltages before connecting components, traces broken wires with continuity beeper, and measures current.',
    inputs: 'Electrical potentials and currents from test probes.',
    outputs: 'Digital numerical reading on LCD screen.',
    pins: [
      { name: 'COM', type: 'Ground', description: 'Common negative test lead (always Black probe)' },
      { name: 'VΩmA', type: 'Passive', description: 'Voltage, resistance, and low-current probe jack (Red probe)' },
      { name: '10A', type: 'Passive', description: 'High-current unfused/fused input for currents up to 10A' }
    ],
    voltage: 'Measures up to 600V DC / AC',
    operating_voltage_min: 0,
    operating_voltage_max: 600,
    current: 'Measures up to 10A DC',
    max_current_draw_ma: 10000,
    logic_level: 'Diagnostic tool',
    interfaces: ['Banana jack probe leads'],
    compatible_boards: ['All electronics'],
    common_projects: ['Circuit Debugging', 'Battery Testing', 'Buck Converter Calibration', 'Diode and Resistor Identification'],
    required_drivers: ['None'],
    safety: [
      'NEVER measure voltage when the dial is set to Current (A or 10A) or Resistance (Ω)! Doing so creates a direct short through the internal shunt resistor and will blow the internal fuse.',
      'Always start on the highest voltage range if measuring unknown voltages.'
    ],
    never_connect_to: ['Probes across power while dial is set to Resistance or Current mode'],
    fun_fact: 'Before digital multimeters became common in the 1970s, scientists used delicate needle galvanometers that could be broken by dropping them on a desk!',
    student_summary: {
      simple_definition: 'The detective tool of the laboratory that checks if wires are broken, tests battery charge, and measures voltage.',
      how_it_works_kid: 'You touch the two probe tips to any wire: it can beep if the wire is connected, or show numbers telling you how full a battery is.',
      why_we_use_it: 'To check your circuits before turning them on so you never fry parts by mistake.',
      golden_safety_rule: 'Never set the dial to "Amps" or "Resistance" when measuring a battery, or you will pop the multimeter fuse!'
    }
  },
  {
    id: 'soldering-iron-kit',
    name: 'Soldering Iron Kit (25W - 40W)',
    aliases: ['Soldering Iron', 'Solder Kit', 'Soldering Station'],
    category: 'Prototyping & Tools',
    modelNumber: '25W - 40W Pencil Soldering Iron',
    visual_features: [
      'Insulated handle with metal barrel and pointed silver/copper conical tip',
      'Mains power cable with 3-pin plug',
      'Metal coil safety stand and yellow cleaning sponge',
      'Tube of 60/40 Rosin Core solder wire'
    ],
    working_principle: 'Resistive ceramic/nichrome heating element heats the tip to ~350°C-400°C. Molten tin-lead or lead-free solder flows between heated copper leads by capillary action, creating a permanent metallurgical and electrical joint.',
    scientific_principle: 'Thermal conduction, eutectic melting point of tin-lead alloys (approx 183°C), and intermetallic bond formation.',
    what_is_it: 'A thermal tool for permanently joining electrical wires and components with melted metal solder.',
    what_it_does: 'Solders motor leads, header pins onto microcontrollers, and permanently joins sensors.',
    inputs: '220V-240V AC mains electricity.',
    outputs: 'Thermal heat at tip (~350°C).',
    pins: [],
    voltage: '220V - 240V AC Mains',
    current: '~150mA',
    logic_level: 'High-temperature thermal tool',
    interfaces: ['Mains wall plug'],
    compatible_boards: ['All electronics prototyping'],
    common_projects: ['Soldering BO motor wire leads', 'Soldering header pins to ESP32 or LCD', 'Permanent robotics wiring'],
    required_drivers: ['None'],
    safety: [
      'EXTREME HEAT HAZARD (350°C): NEVER touch the metal barrel or tip; severe burns happen in milliseconds.',
      'ALWAYS place the iron back into its metal safety stand when not actively soldering.',
      'Work in a well-ventilated room to avoid inhaling rosin flux fumes.',
      'Wash hands after handling solder wire.',
      'Always unplug the soldering iron as soon as you finish your work.'
    ],
    never_connect_to: ['Leaving plugged in unattended on a wooden or plastic desk'],
    fun_fact: 'Soldering has been practiced for over 5,000 years, originally used by ancient Egyptian metalsmiths to make gold jewelry!',
    student_summary: {
      simple_definition: 'A hot thermal wand that melts special metal glue (solder) to permanently join wires together.',
      how_it_works_kid: 'The tip gets hot like an oven to melt soft metal wire around electrical leads so they never come loose.',
      why_we_use_it: 'To attach sturdy wires to robot motors and header pins onto sensor boards.',
      golden_safety_rule: 'The tip is burning hot (350°C)! Only hold the plastic handle, always put it back in the metal stand, and only solder under direct teacher supervision!'
    }
  }
];

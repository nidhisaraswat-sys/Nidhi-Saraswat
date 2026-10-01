import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '50mb' }));

  // Initialize Gemini client strictly using @google/genai as required
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'AI Science Lab Assistant API' });
  });

  // 1. ANALYZE COMPONENTS (MULTIMODAL VISION)
  app.post('/api/analyze-components', async (req, res) => {
    try {
      const { imageBase64, mimeType = 'image/jpeg' } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ error: 'Image base64 data is required' });
      }

      // Clean base64 string if data url prefix is present
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

      const prompt = `
You are the AI Chief Engineer & Scientist of the "AI Science Lab Assistant" for school science, ATL, and robotics laboratories.
You are given a photograph of laboratory components.

Analyze EVERY single visible component on the bench/table. Do NOT stop after identifying the first component. If there are 5 or 10 components, identify all of them. Group duplicates and report exact quantity.

CRITICAL ANTI-HALLUCINATION INSTRUCTION:
- Never pretend to identify a component when the photo is unclear, blurry, or lacks defining features.
- If you can clearly see the component: confidence HIGH (>= 85%).
- If it is likely but partly occluded or unconfirmed model: confidence MEDIUM (60-84%).
- If visual evidence is insufficient: confidence LOW (30-59%).
- If cannot be identified reliably: confidence UNKNOWN (< 30%).
- For LOW or UNKNOWN, state: "Component cannot be confidently identified from this photograph" in uncertainty_reason, and prompt user to upload a clearer photo, photograph label, or enter part number.
- Do NOT invent electrical specs.

School Laboratory Inventory reference:
- Microcontrollers: Arduino UNO R3 (ATmega328P), BBC micro:bit v2, ESP32 Dev Board, ESP32-CAM
- Sensors: HC-SR04 Ultrasonic, Capacitive Soil Moisture v1.2, Resistive Soil Moisture, IR Line Sensor (TCRT5000), DHT11/DHT22, LDR Photoresistor, Raindrops sensor, Soil pH, Soil NPK
- Actuators & Drivers: L298N Motor Driver, L293D IC, BO Yellow Gear Motors, SG90 9g Servo, 5V 1-Channel Relay (optocoupler), Mini Submersible Water Pump (3V-6V), PCA9685 16-ch Servo Driver
- Power & Prototyping: 18650 Li-ion 3.7V, 9V battery + snap, 830-point breadboard, 400-point breadboard, jumper wires, DC-DC Buck converter 5V, 2WD robot chassis + wheels + caster, 16x2 LCD with I2C, NE555 Timer, 1N4007 Diode, BC547/BC557 Transistors, Resistors (220, 330, 1k, 10k), LEDs, Multimeter, Soldering iron kit.

Return a strictly valid JSON response adhering to this schema.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: {
          parts: [
            {
              inlineData: {
                data: cleanBase64,
                mimeType: mimeType,
              },
            },
            {
              text: prompt,
            },
          ],
        },
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              image_quality: {
                type: Type.OBJECT,
                properties: {
                  is_clear: { type: Type.BOOLEAN },
                  lighting: { type: Type.STRING },
                  notes: { type: Type.STRING },
                },
                required: ['is_clear'],
              },
              components: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    component_number: { type: Type.INTEGER },
                    name: { type: Type.STRING },
                    category: { type: Type.STRING },
                    quantity: { type: Type.INTEGER },
                    confidence: { type: Type.INTEGER },
                    confidence_level: { type: Type.STRING },
                    evidence: {
                      type: Type.OBJECT,
                      properties: {
                        visible_markings: { type: Type.STRING },
                        model_number: { type: Type.STRING },
                        pin_terminal_configuration: { type: Type.STRING },
                        physical_type: { type: Type.STRING },
                        visual_clues: {
                          type: Type.ARRAY,
                          items: { type: Type.STRING },
                        },
                      },
                    },
                    specification_notes: { type: Type.STRING },
                    uncertainty_reason: { type: Type.STRING },
                  },
                  required: ['component_number', 'name', 'category', 'quantity', 'confidence', 'confidence_level'],
                },
              },
              identification_warnings: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              safety_warnings: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ['image_quality', 'components'],
          },
        },
      });

      const responseText = response.text || '{}';
      const parsed = JSON.parse(responseText);
      res.json(parsed);
    } catch (err: any) {
      console.error('Error in analyze-components:', err);
      res.status(500).json({
        error: 'Failed to analyze components image',
        details: err.message,
      });
    }
  });

  // 2. CHECK MY CIRCUIT (CIRCUIT DIAGRAM / PHYSICAL WIRING PHOTO ANALYSIS)
  app.post('/api/analyze-circuit', async (req, res) => {
    try {
      const { imageBase64, mimeType = 'image/jpeg', userCircuitNotes = '' } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ error: 'Image base64 is required' });
      }

      const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

      const prompt = `
You are the AI Laboratory Safety and Circuit Diagnostic Specialist in "AI Science Lab Assistant".
Analyze this uploaded photograph of an electronics circuit built on a breadboard or robot chassis.
User notes: "${userCircuitNotes}"

Inspect the visible connections, components, breadboard tracks, power sources, and controller pins.
Check specifically for:
1. Component polarity: Diode stripe (Cathode), LED short leg/flat rim, electrolytic capacitor negative stripe.
2. Dangerous connections: Motor or pump connected directly to microcontroller GPIO without driver/relay.
3. Power limits: Short circuits between 5V and GND, lack of series current-limiting resistor with LEDs.
4. Missing Common Ground: Battery (-) not connected to Arduino GND when using external drivers (L298N, Relay).
5. Breadboard alignment: ICs straddling center trough, wires in same row vs different rows.

Provide an honest, objective diagnosis. Do NOT claim certainty if wires are hidden or blurry; indicate confidence level.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: {
          parts: [
            {
              inlineData: {
                data: cleanBase64,
                mimeType: mimeType,
              },
            },
            { text: prompt },
          ],
        },
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              circuit_summary: { type: Type.STRING },
              detected_components: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              correct_connections: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              possible_errors: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              missing_connections: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              possible_safety_issues: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              suggested_corrections: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              confidence: { type: Type.STRING },
            },
            required: [
              'circuit_summary',
              'detected_components',
              'correct_connections',
              'possible_errors',
              'missing_connections',
              'possible_safety_issues',
              'suggested_corrections',
              'confidence',
            ],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json(parsed);
    } catch (err: any) {
      console.error('Error in analyze-circuit:', err);
      res.status(500).json({
        error: 'Failed to analyze circuit',
        details: err.message,
      });
    }
  });

  // 3. TEACHER MODE MATERIALS GENERATOR
  app.post('/api/teacher-mode', async (req, res) => {
    try {
      const { projectName, classLevel = 8, topic = '' } = req.body;

      const prompt = `
Generate teacher curriculum materials for a school science / ATL laboratory session.
Project: "${projectName}"
Target Class: Class ${classLevel} (adjust conceptual depth, math, and vocabulary precisely for Class ${classLevel} students)
Topic: "${topic}"

Generate:
1. Lesson Plan: Period duration, learning objectives, scientific principles, step-by-step 45-minute lab schedule.
2. Practical Student Worksheet: Fill-in-the-blank observation table, hypothesis prompt, calculations.
3. 5 Multiple Choice Questions (MCQs) with 4 options, correct answer, and explanation.
4. 5 Oral Viva Questions with answers.
5. Assessment Rubric: 4 criteria (Circuit Building, Scientific Understanding, Code Execution, Safety & Lab Hygiene) graded 1 to 4 points.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              project_name: { type: Type.STRING },
              class_level: { type: Type.INTEGER },
              learning_objectives: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              scientific_concepts_explained: { type: Type.STRING },
              lesson_timeline_minutes: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    time_range: { type: Type.STRING },
                    activity: { type: Type.STRING },
                    teacher_action: { type: Type.STRING },
                    student_action: { type: Type.STRING },
                  },
                },
              },
              practical_worksheet: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  hypothesis: { type: Type.STRING },
                  observation_table_columns: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  analysis_questions: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
              },
              mcqs: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    options: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    correct_option_index: { type: Type.INTEGER },
                    explanation: { type: Type.STRING },
                  },
                },
              },
              viva_questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    answer: { type: Type.STRING },
                  },
                },
              },
              rubric: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    criterion: { type: Type.STRING },
                    level_1_poor: { type: Type.STRING },
                    level_2_fair: { type: Type.STRING },
                    level_3_good: { type: Type.STRING },
                    level_4_excellent: { type: Type.STRING },
                  },
                },
              },
            },
            required: ['project_name', 'class_level', 'learning_objectives', 'lesson_timeline_minutes', 'mcqs', 'viva_questions', 'rubric'],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json(parsed);
    } catch (err: any) {
      console.error('Error in teacher-mode:', err);
      res.status(500).json({ error: 'Failed to generate teacher materials', details: err.message });
    }
  });

  // 4. SCIENCE FAIR DOCUMENTATION GENERATOR
  app.post('/api/science-fair', async (req, res) => {
    try {
      const { projectName, availableComponents = [] } = req.body;

      const prompt = `
Generate a formal National Science Fair / ATL Marathon project documentation dossier.
Project: "${projectName}"
Available components: ${JSON.stringify(availableComponents)}

Include:
- Project Title
- Real-World Problem Statement
- Society / Industry Need
- Key Technical Innovation
- Core Scientific Principles Involved
- Technical Solution Architecture
- Circuit Summary & Algorithm Flow
- Expected Quantitative Results
- Real-world Applications
- Advantages over existing solutions
- Limitations
- Future Scope & Expansion
- UN Sustainable Development Goals (SDG) Alignment
- 5 Tough Viva/Judge Questions with Winning Answers
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              problem_statement: { type: Type.STRING },
              societal_need: { type: Type.STRING },
              key_innovation: { type: Type.STRING },
              scientific_principles: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              technical_solution: { type: Type.STRING },
              algorithm_steps: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              expected_results: { type: Type.STRING },
              applications: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              advantages: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              limitations: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              future_scope: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              sdg_alignment: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    goal_number: { type: Type.INTEGER },
                    goal_name: { type: Type.STRING },
                    how_it_contributes: { type: Type.STRING },
                  },
                },
              },
              judge_viva_qa: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    winning_answer: { type: Type.STRING },
                  },
                },
              },
            },
            required: ['title', 'problem_statement', 'societal_need', 'key_innovation', 'technical_solution', 'sdg_alignment', 'judge_viva_qa'],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json(parsed);
    } catch (err: any) {
      console.error('Error in science-fair:', err);
      res.status(500).json({ error: 'Failed to generate science fair doc', details: err.message });
    }
  });

  // Serve static files in production or Vite in development
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`AI Science Lab Assistant server listening on port ${port}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});

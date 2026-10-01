import React, { useState } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  Award, 
  HelpCircle, 
  Copy, 
  Check, 
  RefreshCw,
  Globe
} from 'lucide-react';
import { PROJECT_DATABASE } from '../data/projectDatabase';

export const TeacherModeView: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<number>(8);
  const [selectedProject, setSelectedProject] = useState<string>(PROJECT_DATABASE[0].name);
  const [mode, setMode] = useState<'curriculum' | 'science-fair'>('curriculum');
  const [isLoading, setIsLoading] = useState(false);
  const [teacherData, setTeacherData] = useState<any | null>(null);
  const [scienceFairData, setScienceFairData] = useState<any | null>(null);
  const [copiedSection, setCopiedSection] = useState(false);

  const classes = [6, 7, 8, 9, 10, 11, 12];

  const generateTeacherMaterials = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/teacher-mode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: selectedProject,
          classLevel: selectedClass,
          topic: 'School Science / ATL Lab Curriculum'
        })
      });
      const data = await response.json();
      setTeacherData(data);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching teacher materials:', err);
      setIsLoading(false);
    }
  };

  const generateScienceFairDoc = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/science-fair', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: selectedProject,
          availableComponents: ['Arduino UNO', 'HC-SR04', 'L298N', 'BO Motors', '18650 Battery']
        })
      });
      const data = await response.json();
      setScienceFairData(data);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching science fair doc:', err);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-1">
              <GraduationCap className="h-3.5 w-3.5" />
              <span>Pedagogy, Curriculum & Science Fair Documentation</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">Teacher & Science Fair Hub</h1>
            <p className="text-xs text-slate-300">
              Generate class-level tailored lesson plans, student practical worksheets, MCQs, and national science-fair competition dossiers.
            </p>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setMode('curriculum')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                mode === 'curriculum'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Lesson Plans & Worksheets
            </button>
            <button
              onClick={() => setMode('science-fair')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                mode === 'science-fair'
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Science Fair Project Dossier
            </button>
          </div>
        </div>

        {/* Configuration Bar */}
        <div className="pt-2 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Class Selector */}
          <div>
            <label className="text-slate-400 font-semibold block mb-1">Select Target Grade / Class Level</label>
            <div className="flex space-x-1">
              {classes.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedClass(c)}
                  className={`flex-1 py-1.5 rounded-lg font-mono font-bold transition-all cursor-pointer ${
                    selectedClass === c
                      ? 'bg-indigo-500 text-slate-950 shadow'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Class {c}
                </button>
              ))}
            </div>
          </div>

          {/* Project Template */}
          <div className="sm:col-span-2">
            <label className="text-slate-400 font-semibold block mb-1">Select Laboratory Project</label>
            <div className="flex space-x-2">
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:outline-none"
              >
                {PROJECT_DATABASE.map(p => (
                  <option key={p.id} value={p.name}>{p.name} ({p.category})</option>
                ))}
              </select>

              <button
                onClick={mode === 'curriculum' ? generateTeacherMaterials : generateScienceFairDoc}
                disabled={isLoading}
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                <span>Generate</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="p-8 rounded-2xl bg-slate-900 border border-indigo-500/40 text-center space-y-3 max-w-md mx-auto">
          <RefreshCw className="h-8 w-8 text-indigo-400 animate-spin mx-auto" />
          <h3 className="font-bold text-white text-base">Synthesizing Pedagogical Materials...</h3>
          <p className="text-xs text-slate-400">
            Tailoring cognitive difficulty and assessment rubrics for Class {selectedClass}.
          </p>
        </div>
      )}

      {/* CURRICULUM OUTPUT */}
      {mode === 'curriculum' && teacherData && !isLoading && (
        <div className="space-y-6">
          
          {/* 45-min Lesson Timeline */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-cyan-400" />
              <span>45-Minute Laboratory Lesson Schedule (Class {teacherData.class_level})</span>
            </h3>
            <div className="space-y-2">
              {teacherData.lesson_timeline_minutes?.map((item: any, idx: number) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs grid grid-cols-1 sm:grid-cols-4 gap-2">
                  <span className="font-mono font-bold text-cyan-300">{item.time_range}</span>
                  <span className="font-semibold text-white">{item.activity}</span>
                  <span className="text-slate-400"><strong className="text-slate-300">Teacher:</strong> {item.teacher_action}</span>
                  <span className="text-emerald-300"><strong className="text-emerald-400">Students:</strong> {item.student_action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Student Worksheet */}
          {teacherData.practical_worksheet && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center space-x-2">
                <FileText className="h-4 w-4 text-indigo-400" />
                <span>Student Practical Worksheet</span>
              </h3>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-3">
                <p><strong className="text-cyan-300">Hypothesis Prompt:</strong> {teacherData.practical_worksheet.hypothesis}</p>
                <div>
                  <strong className="text-slate-300 block mb-1">Observation Table Schema:</strong>
                  <div className="flex flex-wrap gap-2">
                    {teacherData.practical_worksheet.observation_table_columns?.map((col: string, i: number) => (
                      <span key={i} className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700">
                        {col}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MCQs with Answers */}
          {teacherData.mcqs && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Multiple Choice Assessment Questions</span>
              </h3>
              <div className="space-y-3">
                {teacherData.mcqs.map((mcq: any, idx: number) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-2">
                    <p className="font-semibold text-white">Q{idx + 1}: {mcq.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2">
                      {mcq.options?.map((opt: string, optIdx: number) => (
                        <div 
                          key={optIdx} 
                          className={`p-2 rounded border text-[11px] ${
                            optIdx === mcq.correct_option_index
                              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300 font-semibold'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}. {opt} {optIdx === mcq.correct_option_index && '✓ (Correct)'}
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-400 italic pl-2">
                      Explanation: {mcq.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Assessment Rubric */}
          {teacherData.rubric && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center space-x-2">
                <Award className="h-4 w-4 text-amber-400" />
                <span>Assessment & Grading Rubric</span>
              </h3>
              <div className="border border-slate-800 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-800 text-slate-300">
                    <tr>
                      <th className="p-2.5">Criterion</th>
                      <th className="p-2.5">Level 1 (Poor)</th>
                      <th className="p-2.5">Level 2 (Fair)</th>
                      <th className="p-2.5">Level 3 (Good)</th>
                      <th className="p-2.5">Level 4 (Excellent)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                    {teacherData.rubric.map((r: any, i: number) => (
                      <tr key={i} className="hover:bg-slate-800/30">
                        <td className="p-2.5 font-bold text-cyan-300">{r.criterion}</td>
                        <td className="p-2.5 text-slate-400">{r.level_1_poor}</td>
                        <td className="p-2.5 text-slate-300">{r.level_2_fair}</td>
                        <td className="p-2.5 text-slate-200">{r.level_3_good}</td>
                        <td className="p-2.5 text-emerald-300 font-semibold">{r.level_4_excellent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      )}

      {/* SCIENCE FAIR OUTPUT */}
      {mode === 'science-fair' && scienceFairData && !isLoading && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-purple-400 block font-mono">National Science Fair / ATL Marathon Dossier</span>
              <h2 className="text-xl font-bold text-white mt-1">{scienceFairData.title}</h2>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(scienceFairData, null, 2));
                setCopiedSection(true);
                setTimeout(() => setCopiedSection(false), 2000);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-purple-300 border border-slate-700 font-semibold cursor-pointer"
            >
              {copiedSection ? '✓ Copied Dossier' : 'Copy Full Dossier'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <strong className="text-rose-400 block font-bold uppercase">Real-World Problem</strong>
              <p className="text-slate-300 leading-relaxed">{scienceFairData.problem_statement}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <strong className="text-emerald-400 block font-bold uppercase">Societal Need & Innovation</strong>
              <p className="text-slate-300 leading-relaxed">{scienceFairData.key_innovation}</p>
            </div>
          </div>

          {/* SDG Alignment */}
          {scienceFairData.sdg_alignment && (
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <strong className="text-cyan-300 text-xs font-bold uppercase flex items-center space-x-1.5">
                <Globe className="h-4 w-4" />
                <span>UN Sustainable Development Goals (SDG) Alignment</span>
              </strong>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {scienceFairData.sdg_alignment.map((sdg: any, i: number) => (
                  <div key={i} className="p-2.5 rounded-lg bg-cyan-950/20 border border-cyan-500/20 space-y-1">
                    <span className="font-bold text-cyan-300 block font-mono">SDG {sdg.goal_number}: {sdg.goal_name}</span>
                    <p className="text-slate-400 text-[11px]">{sdg.how_it_contributes}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tough Judge Questions */}
          {scienceFairData.judge_viva_qa && (
            <div className="space-y-2">
              <strong className="text-amber-300 text-xs font-bold uppercase flex items-center space-x-1.5">
                <HelpCircle className="h-4 w-4" />
                <span>Tough Judge Questions & Winning Answers</span>
              </strong>
              <div className="space-y-2 text-xs">
                {scienceFairData.judge_viva_qa.map((qa: any, i: number) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                    <p className="font-semibold text-amber-200">Judge Q{i + 1}: {qa.question}</p>
                    <p className="text-slate-300 pl-4"><strong className="text-emerald-400">Winning Response: </strong>{qa.winning_answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!teacherData && !scienceFairData && !isLoading && (
        <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/40 text-center max-w-lg mx-auto space-y-2">
          <GraduationCap className="h-8 w-8 text-slate-500 mx-auto" />
          <h3 className="font-bold text-white text-base">Select Grade & Generate Materials</h3>
          <p className="text-xs text-slate-400">
            Pick a class (Class 6 through 12) and project above to generate instant structured worksheets, lesson plans, or science-fair dossiers.
          </p>
        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import { 
  Users, 
  Trash2, 
  Award, 
  BookOpen, 
  Menu, 
  X,
  Info,
  Edit,
  LayoutDashboard,
  School,
  GraduationCap,
  CalendarCheck,
  ClipboardList,
  BarChart2,
  BarChart,
  Sun,
  LogOut,
  Moon,
  TrendingUp,
  PieChart
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // --- Dynamic Class Storage ---
  const [createdClasses, setCreatedClasses] = useState([]);

  // --- Class Modal State ---
  const [isCreateClassModalOpen, setIsCreateClassModalOpen] = useState(false);
  const [classForm, setClassForm] = useState({
    className: '',
    gradeLevel: 'ថ្នាក់ទី 10',
    academicYear: '2026'
  });

  // --- Teacher Profile Sidebar Inputs ---
  const [teacherName, setTeacherName] = useState('');
  const [teacherImage, setTeacherImage] = useState("https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeacherImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Student List & Form States ---
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [studentForm, setStudentForm] = useState({
    studentId: '', name: '', gender: 'ប្រុស', dob: '', grade: '១១ក', phone: ''
  });
  
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Set students to empty array to start fresh
  const [students, setStudents] = useState([]);

  // --- Dynamic Score Months System ---
  const [scoreMonths, setScoreMonths] = useState([
    { id: 1, name: 'ខែទី ១' }
  ]);
  const [activeScoreMonthId, setActiveScoreMonthId] = useState(1);

  const handleAddNewMonth = () => {
    const nextId = scoreMonths.length + 1;
    const newMonth = { id: nextId, name: `ខែទី ${nextId}` };
    setScoreMonths([...scoreMonths, newMonth]);
    
    const updatedScores = { ...studentScores };
    updatedScores[nextId] = {}; 
    students.forEach(s => {
      updatedScores[nextId][s.id] = { kh: 0, math: 0, phy: 0, chem: 0, bio: 0, earth: 0, hist: 0, geo: 0, mor: 0, eng: 0 };
    });
    setStudentScores(updatedScores);
    setActiveScoreMonthId(nextId);
  };

  const [studentScores, setStudentScores] = useState({ 1: {} });

  // --- Dynamic Semester System ---
  const [semesterTabs, setSemesterScoresTabs] = useState([
    { id: 1, name: 'ឆមាសទី ១' }
  ]);
  const [activeSemesterTabId, setActiveSemesterTabId] = useState(1);

  const handleAddNewSemester = () => {
    const nextId = semesterTabs.length + 1;
    const newSem = { id: nextId, name: `ឆមាសទី ${nextId}` };
    setSemesterScoresTabs([...semesterTabs, newSem]);
    
    const updatedSemScores = { ...semesterScores };
    updatedSemScores[nextId] = {}; 
    students.forEach(s => {
      updatedSemScores[nextId][s.id] = { kh: 0, math: 0, phy: 0, chem: 0, bio: 0, earth: 0, hist: 0, geo: 0, mor: 0, eng: 0 };
    });
    setSemesterScores(updatedSemScores);
    setActiveSemesterTabId(nextId);
  };

  const [semesterScores, setSemesterScores] = useState({ 1: {} });

  // --- Score Modals ---
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [editingScoreStudentId, setEditingScoreStudentId] = useState(null);
  const [scoreForm, setScoreForm] = useState({ kh: 0, math: 0, phy: 0, chem: 0, bio: 0, earth: 0, hist: 0, geo: 0, mor: 0, eng: 0 });

  const [isSemesterScoreModalOpen, setIsSemesterScoreModalOpen] = useState(false);
  const [editingSemesterScoreStudentId, setEditingSemesterScoreStudentId] = useState(null);
  const [semesterScoreForm, setSemesterScoreForm] = useState({ kh: 0, math: 0, phy: 0, chem: 0, bio: 0, earth: 0, hist: 0, geo: 0, mor: 0, eng: 0 });

  // --- Attendance ---
  const [attendance, setAttendance] = useState({ 1: 'present', 2: 'present', 3: 'leave', 4: 'present', 5: 'absent' });
  const [selectedDay, setSelectedDay] = useState('03');
  const [selectedMonth, setSelectedMonth] = useState('07');
  const [selectedYear, setSelectedYear] = useState('2026');

  // --- Constants ---
  const khmerMonths = [
    { value: '01', label: 'មករា' }, { value: '02', label: 'កុម្ភៈ' }, { value: '03', label: 'មីនា' },
    { value: '04', label: 'មេសា' }, { value: '05', label: 'ឧសភា' }, { value: '06', label: 'មិថុនា' },
    { value: '07', label: 'កក្កដា' }, { value: '08', label: 'សីហា' }, { value: '09', label: 'កញ្ញា' },
    { value: '10', label: 'តុលា' }, { value: '11', label: 'វិច្ឆិកា' }, { value: '12', label: 'ធ្នូ' },
  ];
  const daysList = Array.from({ length: 31 }, (_, i) => (i + 1 < 10 ? `0${i + 1}` : `${i + 1}`));

  const subjects = [
    { name: 'អក្សរសាស្ត្រខ្មែរ', teacher: 'អ្នកគ្រូ សុខ ម៉ារី', color: 'bg-red-100 text-red-700 border-red-200', link: 'https://online.fliphtml5.com/fzdxb/xvvn/#p=1' },
    { name: 'គណិតវិទ្យា', teacher: 'លោកគ្រូ ជា សុខា', color: 'bg-blue-100 text-blue-700 border-blue-200', link: 'https://online.fliphtml5.com/mylzw/yfex/#p=1' },
    { name: 'រូបវិទ្យា', teacher: 'លោកគ្រូ វ៉ាន់ សុវណ្ណ', color: 'bg-green-100 text-green-700 border-green-200', link: 'https://ebook.spm-edoc.com/ereading/Grade11Part2/PhysicGrade11/#p=6' },
    { name: 'គីមីវិទ្យា', teacher: 'អ្នកគ្រូ ចាន់ នីតា', color: 'bg-purple-100 text-purple-700 border-purple-200', link: 'https://online.fliphtml5.com/fzdxb/aefd/#p=1' },
    { name: 'ជីវវិទ្យា', teacher: 'អ្នកគ្រូ មាស ផល្លា', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', link: 'https://ebook.spm-edoc.com/ereading/Grade11Part1/BiologyGrade11/#p=1' },
    { name: 'ភាសាអង់គ្លេស', teacher: 'លោកគ្រូ John Doe', color: 'bg-indigo-100 text-indigo-700 border-indigo-200', link: 'https://share.google/4yUixY9itSyyddJk3' },
  ];

  const [schedule, setSchedule] = useState([
    { time: '7:00 - 8:00', mon: 'ផែនដីវិទ្យា', tue: 'ជីវវិទ្យា', wed: 'គណិតវិទ្យា', thu: 'គណិតវិទ្យា', fri: 'ជីវវិទ្យា', sat: 'ភាសាខ្មែរ' },
    { time: '8:00 - 9:00', mon: 'ផែនដីវិទ្យា', tue: 'ជីវវិទ្យា', wed: 'គណិតវិទ្យា', thu: 'គណិតវិទ្យា', fri: 'គីមីវិទ្យា', sat: 'ភាសាខ្មែរ' },
    { time: '9:00 - 10:00', mon: 'ប្រវត្តិវិទ្យា', tue: 'កុំព្យូទ័រ', wed: 'ភូមិវិទ្យា', thu: 'ភាសាខ្មែរ', fri: 'អង់គ្លេស', sat: 'គណិតវិទ្យា' },
    { time: '10:00 - 11:00', mon: 'ប្រវត្តិវិទ្យា', tue: 'x', wed: 'ភូមិវិទ្យា', thu: 'កីឡា', fri: 'អង់គ្លេស', sat: 'x' },
    { type: 'break', label: 'ពេលរសៀល' },
    { time: '1:00 - 2:00', mon: '', tue: '', wed: '', thu: '', fri: '', sat: '' },
    { time: '2:00 - 3:00', mon: 'រូបវិទ្យា', tue: 'គីមីវិទ្យា', wed: 'សីលធម៌', thu: 'x', fri: 'សីលធម៌', sat: 'x' },
    { time: '3:00 - 4:00', mon: 'រូបវិទ្យា', tue: 'គីមីវិទ្យា', wed: 'រូបវិទ្យា', thu: 'x', fri: 'សេដ្ឋកិច្ច', sat: 'x' },
    { time: '4:00 - 5:00', mon: '', tue: '', wed: '', thu: '', fri: '', sat: 'x' },
  ]);

  const [editingScheduleCell, setEditingScheduleCell] = useState(null);
  const [scheduleCellValue, setScheduleCellValue] = useState('');
  const [isScheduleEditModalOpen, setIsScheduleEditModalOpen] = useState(false);

  const handleEditScheduleCell = (rowIndex, dayKey, currentValue) => {
    setEditingScheduleCell({ rowIndex, dayKey });
    setScheduleCellValue(currentValue);
    setIsScheduleEditModalOpen(true);
  };

  const handleSaveScheduleCell = (e) => {
    e.preventDefault();
    if (editingScheduleCell) {
      const { rowIndex, dayKey } = editingScheduleCell;
      const updatedSchedule = schedule.map((row, idx) => {
        if (idx === rowIndex) {
          return { ...row, [dayKey]: scheduleCellValue };
        }
        return row;
      });
      setSchedule(updatedSchedule);
      setIsScheduleEditModalOpen(false);
      setEditingScheduleCell(null);
    }
  };

  const cleaners = [];

  // --- Handlers Protected by Navigation Guard Requirement ---
  const checkTabChange = (tabId) => {
    if (createdClasses.length === 0 && tabId !== 'my_class' && tabId !== 'home') {
      setIsCreateClassModalOpen(true);
    } else {
      setActiveTab(tabId);
    }
  };

  const SidebarItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => { checkTabChange(id); setIsMobileMenuOpen(false); }}
      className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 ${
        activeTab === id ? 'bg-[#31423c] text-white font-bold' : 'text-[#8ba39a] hover:bg-[#202e2a] hover:text-gray-200'
      } font-siemreap`}
    >
      <Icon size={20} strokeWidth={activeTab === id ? 2.5 : 2} className={activeTab === id ? 'text-white' : 'text-[#8ba39a]'} />
      <span className="text-[15px]">{label}</span>
    </button>
  );

  const markAttendance = (studentId, status) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSaveAttendance = () => {
    const dateStr = `${selectedDay}-${selectedMonth}-${selectedYear}`;
    let csvContent = "\uFEFF"; 
    csvContent += "ល.រ,អត្តលេខ,កម្រិតថ្នាក់,ឈ្មោះសិស្ស,ភេទ,កាលបរិច្ឆេទ,ស្ថានភាពវត្តមាន,លេខទូរស័ព្ទ\n";

    students.forEach((student, index) => {
      const statusKey = attendance[student.id];
      let statusKhmer = "មិនទាន់ស្រង់";
      if (statusKey === 'present') statusKhmer = "វត្តមាន";
      else if (statusKey === 'absent') statusKhmer = "អវត្តមាន";
      else if (statusKey === 'leave') statusKhmer = "ច្បាប់";

      csvContent += `${index + 1},${student.studentId},${student.grade},"${student.name}",${student.gender},${dateStr},${statusKhmer},${student.phone}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `វត្តមាន_ថ្នាក់១១ក_${dateStr}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleStudentFormChange = (e) => {
    const { name, value } = e.target;
    setStudentForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveStudent = (e) => {
    e.preventDefault();
    if (editingStudentId) {
      setStudents(students.map(s => s.id === editingStudentId ? { ...s, ...studentForm } : s));
    } else {
      const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
      setStudents([...students, { id: newId, ...studentForm }]);
      
      const updatedScores = { ...studentScores };
      Object.keys(updatedScores).forEach(mId => {
        if (!updatedScores[mId]) updatedScores[mId] = {};
        updatedScores[mId][newId] = { kh: 0, math: 0, phy: 0, chem: 0, bio: 0, earth: 0, hist: 0, geo: 0, mor: 0, eng: 0 };
      });
      setStudentScores(updatedScores);

      const updatedSemScores = { ...semesterScores };
      Object.keys(updatedSemScores).forEach(sId => {
        if (!updatedSemScores[sId]) updatedSemScores[sId] = {}; 
        updatedSemScores[sId][newId] = { kh: 0, math: 0, phy: 0, chem: 0, bio: 0, earth: 0, hist: 0, geo: 0, mor: 0, eng: 0 };
      });
      setSemesterScores(updatedSemScores);
    }
    setIsStudentModalOpen(false);
  };

  const handleEditStudent = (student) => {
    setStudentForm(student);
    setEditingStudentId(student.id);
    setIsStudentModalOpen(true);
  };

  const handleDeleteConfirm = (id) => {
    setDeleteConfirmId(id);
  };

  const executeDeleteStudent = () => {
    if (deleteConfirmId) {
      setStudents(students.filter(s => s.id !== deleteConfirmId));
      setDeleteConfirmId(null);
    }
  };

  const openAddStudentModal = () => {
    setStudentForm({ studentId: '', name: '', gender: 'ប្រុស', dob: '', grade: '១១ក', phone: '' });
    setEditingStudentId(null);
    setIsStudentModalOpen(true);
  };

  const handleClassFormChange = (e) => {
    const { name, value } = e.target;
    setClassForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateClassSubmit = (e) => {
    e.preventDefault();
    const newClass = {
      id: Date.now(),
      className: classForm.className,
      gradeLevel: classForm.gradeLevel,
      academicYear: classForm.academicYear
    };
    setCreatedClasses([...createdClasses, newClass]);
    setIsCreateClassModalOpen(false);
    setClassForm({ className: '', gradeLevel: 'ថ្នាក់ទី 10', academicYear: '2026' });
    setActiveTab('my_class');
  };

  // --- Score Handlers (Monthly) ---
  const handleScoreFormChange = (e) => {
    const { name, value } = e.target;
    setScoreForm(prev => ({ ...prev, [name]: Number(value) || 0 }));
  };

  const handleEditScoresClick = (studentId) => {
    const monthScores = studentScores[activeScoreMonthId] || {};
    const currentScores = monthScores[studentId] || { kh: 0, math: 0, phy: 0, chem: 0, bio: 0, earth: 0, hist: 0, geo: 0, mor: 0, eng: 0 };
    setScoreForm(currentScores);
    setEditingScoreStudentId(studentId);
    setIsScoreModalOpen(true);
  };

  const handleSaveScoresSubmit = (e) => {
    e.preventDefault();
    setStudentScores(prev => ({
      ...prev,
      [activeScoreMonthId]: {
        ...(prev[activeScoreMonthId] || {}),
        [editingScoreStudentId]: scoreForm
      }
    }));
    setIsScoreModalOpen(false);
  };

  // --- Semester Score Handlers ---
  const handleSemesterScoreFormChange = (e) => {
    const { name, value } = e.target;
    setSemesterScoreForm(prev => ({ ...prev, [name]: Number(value) || 0 }));
  };

  const handleEditSemesterScoresClick = (studentId) => {
    const semScores = semesterScores[activeSemesterTabId] || {};
    const currentScores = semScores[studentId] || { kh: 0, math: 0, phy: 0, chem: 0, bio: 0, earth: 0, hist: 0, geo: 0, mor: 0, eng: 0 };
    setSemesterScoreForm(currentScores);
    setEditingSemesterScoreStudentId(studentId);
    setIsSemesterScoreModalOpen(true);
  };

  const handleSaveSemesterScoresSubmit = (e) => {
    e.preventDefault();
    setSemesterScores(prev => ({
      ...prev,
      [activeSemesterTabId]: {
        ...(prev[activeSemesterTabId] || {}),
        [editingSemesterScoreStudentId]: semesterScoreForm
      }
    }));
    setIsSemesterScoreModalOpen(false);
  };

  // --- Views ---
  const renderHome = () => (
    <div className="space-y-8 animate-fade-in text-left">
      <div className="bg-gradient-to-r from-[#1a2332] to-[#1e2f38] rounded-3xl p-10 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center mb-6 z-10">
          <School size={28} className="text-blue-500" />
        </div>
        
        <h2 className="text-2xl md:text-3xl font-moul text-white mb-2 z-10 flex items-center">
          ស្វាគមន៍មកកាន់ KrouDigital! <span className="ml-2">🎉</span>
        </h2>
        <p className="text-gray-400 font-siemreap mb-8 z-10 text-sm md:text-base">ចាប់ផ្តើមក្នុង ៣ ជំហានសាមញ្ញ</p>
        
        <ul className="space-y-4 font-siemreap text-gray-300 text-left mb-10 z-10">
          <li className="flex items-center space-x-4">
            <span className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center text-xs font-bold border border-blue-500/30">១</span>
            <span>បង្កើតថ្នាក់របស់អ្នក</span>
          </li>
          <li className="flex items-center space-x-4">
            <span className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center text-xs font-bold border border-blue-500/30">២</span>
            <span>បន្ថែមសិស្សចូលថ្នាក់</span>
          </li>
          <li className="flex items-center space-x-4">
            <span className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center text-xs font-bold border border-blue-500/30">៣</span>
            <span>ស្រង់ពិន្ទុ → បោះពុម្ពសន្លឹក</span>
          </li>
        </ul>
        
        <button 
          onClick={() => setIsCreateClassModalOpen(true)} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-siemreap font-bold py-3 px-8 rounded-xl transition duration-300 z-10 flex items-center shadow-lg shadow-blue-900/50"
        >
          <span className="mr-2 text-xl leading-none">+</span> បង្កើតថ្នាក់ដំបូង
        </button>
      </div>

      <div className="space-y-4">
        <h3 className={`text-xl font-moul text-left border-l-4 border-blue-600 pl-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>ទូទៅ</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-siemreap">
          <button 
            onClick={() => setActiveTab('monthly_score')} 
            className="bg-[#1f293d] hover:bg-[#2c3d59] text-gray-200 py-5 px-6 rounded-2xl flex items-center justify-center space-x-3 transition shadow-md border border-slate-800"
          >
            <ClipboardList className="text-blue-400" size={24} />
            <span className="text-lg font-semibold">ពិន្ទុខែ</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('attendance')} 
            className="bg-[#182e29] hover:bg-[#203f38] text-gray-200 py-5 px-6 rounded-2xl flex items-center justify-center space-x-3 transition shadow-md border border-emerald-950"
          >
            <CalendarCheck className="text-emerald-400" size={24} />
            <span className="text-lg font-semibold">វត្តមាន</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('results')} 
            className="bg-[#241c30] hover:bg-[#342945] text-gray-200 py-5 px-6 rounded-2xl flex items-center justify-center space-x-3 transition shadow-md border border-purple-950"
          >
            <BarChart2 className="text-purple-400" size={24} />
            <span className="text-lg font-semibold">លទ្ធផល</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('students')} 
            className="bg-[#2d2218] hover:bg-[#3f3022] text-gray-200 py-5 px-6 rounded-2xl flex items-center justify-center space-x-3 transition shadow-md border border-amber-950"
          >
            <GraduationCap className="text-amber-500" size={24} />
            <span className="text-lg font-semibold">សិស្ស</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className={`rounded-2xl shadow-sm border overflow-hidden animate-fade-in p-6 md:p-10 ${isDarkMode ? 'bg-[#1e293b] border-[#334155] text-white' : 'bg-white border-gray-100 text-gray-800'}`}>
      <div className="flex justify-between items-start mb-6">
        <div className="text-left font-moul text-xs md:text-sm">
          <p>វិទ្យាល័យ សន្តិភាព</p>
          <p className="mt-1">ថ្នាក់ទី ១១ "ក" វិទ្យាសាស្ត្រ</p>
        </div>
        <div className="text-center font-moul text-xs md:text-sm">
          <p>ព្រះរាជាណាចក្រកម្ពុជា</p>
          <p className="mt-1">ជាតិ សាសនា ព្រះមហាក្សត្រ</p>
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-4xl font-moul text-blue-800 drop-shadow-sm mb-2" style={{ WebkitTextStroke: '0.5px orange' }}>កាលវិភាគប្រចាំសប្តាហ៍</h2>
        <p className="font-moul text-xs md:text-sm text-blue-800">ឆ្នាំសិក្សា ២០២៥-២០២៦</p>
      </div>

      <div className="overflow-x-auto">
        <table className={`w-full text-center border-collapse border-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>
          <thead>
            <tr className={`font-moul border-2 text-sm md:text-base ${isDarkMode ? 'bg-[#131d2e] text-white border-slate-600' : 'bg-[#fce5cd] text-gray-900 border-black'}`}>
              <th className={`p-3 border w-28 whitespace-nowrap ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>ម៉ោង</th>
              <th className={`p-3 border whitespace-nowrap ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>ចន្ទ</th>
              <th className={`p-3 border whitespace-nowrap ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>អង្គារ</th>
              <th className={`p-3 border whitespace-nowrap ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>ពុធ</th>
              <th className={`p-3 border whitespace-nowrap ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>ព្រ.ស</th>
              <th className={`p-3 border whitespace-nowrap ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>សុក្រ</th>
              <th className={`p-3 border whitespace-nowrap ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>សៅរ៍</th>
            </tr>
          </thead>
          <tbody className="font-siemreap text-sm md:text-base">
            {schedule.map((row, index) => {
              if (row.type === 'break') {
                return (
                  <tr key={index} className={`border ${isDarkMode ? 'border-slate-600 bg-slate-800/80' : 'border-black bg-white'}`}>
                    <td colSpan="7" className={`p-2 font-moul text-lg border ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{row.label}</td>
                  </tr>
                );
              }
              return (
                <tr key={index} className={`border ${isDarkMode ? 'border-slate-600 bg-[#1e293b]' : 'border-black bg-white'}`}>
                  <td className={`p-2 border font-bold text-blue-800 ${isDarkMode ? 'border-slate-600 bg-slate-800' : 'border-black bg-gray-50'}`}>{row.time}</td>
                  {['mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((dayKey) => {
                    const cellVal = row[dayKey];
                    return (
                      <td key={dayKey} className={`p-2 border relative group ${isDarkMode ? 'border-slate-600 text-white' : 'border-black text-gray-800'}`}>
                        <div className="flex items-center justify-between min-h-[1.5rem] pr-5">
                          <span className="w-full text-center">{cellVal || ''}</span>
                          <button 
                            onClick={() => handleEditScheduleCell(index, dayKey, cellVal || '')}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-blue-100 hover:text-blue-600 text-gray-400 absolute right-1 top-1/2 -translate-y-1/2"
                            title="កែប្រែ"
                          >
                            <Edit size={12} />
                          </button>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-end mt-12 font-siemreap text-xs md:text-sm space-y-8 md:space-y-0 px-4">
        <div className="text-center font-bold">
          <p>បានឃើញ និងឯកភាព</p>
          <p className="font-moul mt-2">នាយកសាលា</p>
        </div>
        <div className="text-center">
          <p>ថ្ងៃសៅរ៍ ១១កើត ខែកត្តិក ឆ្នាំម្សាញ់ សប្តស័ក ព.ស ២៥៦៩</p>
          <p className="mt-1">វ.សស ថ្ងៃទី០១ ខែវិច្ឆិកា ឆ្នាំ២០២៥</p>
          <p className={`font-moul mt-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-900'}`}>គ្រូបន្ទុកថ្នាក់</p>
          <p className="mt-16 font-bold">ម៉ោង សុខា</p>
        </div>
      </div>
    </div>
  );

  const renderCleaning = () => {
    const khmerDigits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
    const toKhmerNum = (num) => {
      let str = num < 10 ? '0' + num : String(num);
      return str.split('').map(d => khmerDigits[parseInt(d)]).join('');
    };

    return (
      <div className={`rounded-2xl shadow-sm border overflow-hidden animate-fade-in p-6 md:p-10 ${isDarkMode ? 'bg-[#1e293b] border-[#334155] text-white' : 'bg-white border-gray-100 text-gray-800'}`}>
        <div className="flex justify-between items-start mb-6">
          <div className="text-left font-moul text-xs md:text-sm">
            <p>វិទ្យាល័យ ........................</p>
          </div>
          <div className="text-center font-moul text-xs md:text-sm">
            <p>ព្រះរាជាណាចក្រកម្ពុជា</p>
            <p className="mt-1">ជាតិ សាសនា ព្រះមហាក្សត្រ</p>
            <p className="mt-1">******</p>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className={`text-2xl md:text-3xl font-moul mb-2 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>វេនសម្អាតប្រចាំសប្តាហ៍</h2>
          <p className="font-moul text-sm">ឆ្នាំសិក្សា ២០២៥-២០២៦</p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="grid grid-cols-3 gap-x-6 md:gap-x-24 gap-y-6 text-center font-siemreap font-bold text-sm md:text-base">
            <div className="col-start-2">
              <p>ប្រធានថ្នាក់</p>
              <p className="mt-1">........................</p>
            </div>
            <div className="col-start-1 row-start-2">
              <p>អនុប្រធានទី១</p>
              <p className="mt-1">........................</p>
            </div>
            <div className="col-start-3 row-start-2">
              <p>អនុប្រធានទី២</p>
              <p className="mt-1">........................</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 font-siemreap mt-8">
          {cleaners.map((item, index) => (
            <div key={index} className="flex flex-col">
              <h3 className="text-center font-moul text-md mb-4">{item.day}</h3>
              <ul className="space-y-2.5">
                {item.members.map((member, i) => (
                  <li key={i} className="flex items-center text-[15px] md:text-sm lg:text-[15px]">
                    <span className="w-8 md:w-6 lg:w-8 font-medium">{toKhmerNum(i + 1)}.</span>
                    <span className="flex-1 text-left font-medium whitespace-nowrap">{member.name}</span>
                    <span className={`text-right whitespace-nowrap ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>{member.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {cleaners.length === 0 && (
          <div className="text-center py-10 text-gray-400 font-siemreap border-2 border-dashed border-gray-300 rounded-xl my-6">
            មិនទាន់មានទិន្នន័យវេនសម្អាតប្រចាំសប្តាហ៍ឡើយ។
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-end mt-16 font-siemreap text-xs md:text-sm space-y-8 md:space-y-0 px-4">
          <div className="text-center font-bold">
            <p>បានឃើញ និងឯកភាព</p>
            <p className="font-moul mt-2">នាយកសាលា</p>
          </div>
          <div className="text-center">
            <p>ថ្ងៃសៅរ៍ ១១កើត ខែកត្តិក ឆ្នាំម្សាញ់ សប្តស័ក ព.ស ២៥៦៩</p>
            <p className="mt-1">វិ.សស ថ្ងៃទី០១ ខែវិច្ឆិកា ឆ្នាំ២០២៥</p>
            <p className={`font-moul mt-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-900'}`}>គ្រូបន្ទុកថ្នាក់</p>
            <p className="mt-16 font-bold">........................</p>
          </div>
        </div>
      </div>
    );
  };

  const renderAdmin = () => (
    <div className="animate-fade-in space-y-6 text-left">
      {createdClasses.length === 0 ? (
        <div className="bg-gradient-to-r from-[#1a2332] to-[#1e2f38] rounded-3xl py-16 px-8 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden h-[400px]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>

          <div className="w-16 h-16 bg-[#26374a] rounded-2xl flex items-center justify-center mb-6 z-10 shadow-inner">
            <School size={32} className="text-blue-500" />
          </div>
          
          <h2 className="text-2xl font-bold font-siemreap text-white mb-3 z-10">
            បង្កើតថ្នាក់ដំបូងរបស់អ្នក
          </h2>
          
          <p className="text-gray-400 font-siemreap mb-10 z-10 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            ចាប់ផ្តើមដោយបង្កើតថ្នាក់ → បន្ថែមសិស្ស → ស្រង់ពិន្ទុ → បោះពុម្ព<br/>
            សន្លឹកពិន្ទុ។
          </p>
          
          <button 
            onClick={() => setIsCreateClassModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-siemreap font-bold py-3 px-8 rounded-xl transition duration-300 z-10 flex items-center shadow-lg shadow-blue-900/50"
          >
            <span className="mr-2 text-xl leading-none">+</span> បង្កើតថ្នាក់ដំបូង
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className={`text-xl font-moul ${isDarkMode ? 'text-white' : 'text-[#16211e]'}`}>ថ្នាក់រៀនដែលបានបង្កើត</h3>
            <button 
              onClick={() => setIsCreateClassModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-siemreap font-bold py-2.5 px-5 rounded-xl transition duration-300 flex items-center shadow-md shadow-blue-900/20"
            >
              <span className="mr-2 text-lg">+</span> បង្កើតថ្នាក់បន្ថែម
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {createdClasses.map((cls) => (
              <div 
                key={cls.id} 
                className={`rounded-2xl p-6 border shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between ${isDarkMode ? 'bg-[#1e293b] border-[#334155]' : 'bg-white border-slate-100'}`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg px-3 py-1 text-xs font-bold font-siemreap">
                      សកម្មភាពធម្មតា
                    </div>
                    <span className="text-slate-400 font-siemreap text-xs bg-slate-50 px-2 py-1 rounded">
                      ឆ្នាំសិក្សា {cls.academicYear}
                    </span>
                  </div>
                  
                  <h4 className={`text-xl font-moul mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{cls.className}</h4>
                  <p className="text-slate-500 font-siemreap text-sm mb-6">{cls.gradeLevel}</p>
                </div>

                <button 
                  onClick={() => setActiveTab('home')}
                  className="w-full bg-[#16211e] hover:bg-[#202e2a] text-white font-siemreap font-bold py-2.5 rounded-xl transition duration-300 flex items-center justify-center shadow-sm"
                >
                  ចូលទៅកាន់
                </button>
              </div>
            ))}
          </div>
          
          <div className="space-y-8 mt-10">
            {renderSchedule()}
            {renderCleaning()}
          </div>
        </div>
      )}
    </div>
  );

  const renderStudentList = () => {
    const femaleCount = students.filter(s => s.gender === 'ស្រី').length;
    const maleCount = students.filter(s => s.gender === 'ប្រុស').length;
    const totalCount = students.length;

    return (
      <div className={`rounded-2xl shadow-sm border overflow-hidden animate-fade-in relative ${isDarkMode ? 'bg-[#1e293b] border-[#334155]' : 'bg-white border-gray-100'}`}>
        <div className={`p-6 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${isDarkMode ? 'bg-[#0f172a]/30 border-[#334155]' : 'bg-gray-50/50 border-gray-100'}`}>
          <div>
            <h2 className={`text-2xl font-moul mb-3 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>បញ្ជីឈ្មោះសិស្ស</h2>
            <div className="flex flex-wrap gap-3 font-siemreap text-sm text-gray-600">
              <div className={`px-3 py-1.5 rounded-lg border shadow-sm flex items-center ${isDarkMode ? 'bg-[#0f172a] border-[#334155] text-white' : 'bg-white border-gray-200'}`}>
                <Users size={16} className="mr-1.5 text-blue-500"/> សរុប៖ <strong className="ml-1 text-gray-800">{totalCount} នាក់</strong>
              </div>
              <div className="bg-pink-50 px-3 py-1.5 rounded-lg border border-pink-100 shadow-sm flex items-center text-pink-700">
                ស្រី៖ <strong className="ml-1">{femaleCount} នាក់</strong>
              </div>
              <div className="bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 shadow-sm flex items-center text-blue-700">
                ប្រុស៖ <strong className="ml-1">{maleCount} នាក់</strong>
              </div>
            </div>
          </div>
          <button onClick={openAddStudentModal} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-siemreap hover:bg-blue-700 transition shadow-sm whitespace-nowrap">+ បន្ថែមសិស្សថ្មី</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`font-moul text-sm uppercase tracking-wider ${isDarkMode ? 'bg-[#131d2e] text-[#94a3b8] border-b border-[#334155]' : 'bg-gray-50 text-gray-600 border-b border-gray-200'}`}>
                <th className="p-4">ល.រ</th>
                <th className="p-4">អត្តលេខ</th>
                <th className="p-4">គោត្តនាម និង នាម</th>
                <th className="p-4">ភេទ</th>
                <th className="p-4">កម្រិតថ្នាក់</th>
                <th className="p-4">ថ្ងៃខែឆ្នាំកំណើត</th>
                <th className="p-4">លេខទូរស័ព្ទ</th>
                <th className="p-4 text-center">សកម្មភាព</th>
              </tr>
            </thead>
            <tbody className={`font-siemreap text-md ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
              {students.map((student, index) => (
                <tr key={student.id} className={`transition border-b ${isDarkMode ? 'hover:bg-slate-800 border-[#334155]' : 'hover:bg-blue-50/50 border-gray-100'} last:border-0`}>
                  <td className="p-4 font-bold text-gray-500">{index + 1}</td>
                  <td className="p-4">{student.studentId}</td>
                  <td className="p-4 font-medium">{student.name}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${student.gender === 'ប្រុស' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                      {student.gender}
                    </span>
                  </td>
                  <td className="p-4">{student.grade}</td>
                  <td className="p-4">{student.dob}</td>
                  <td className="p-4 text-gray-500">{student.phone}</td>
                  <td className="p-4 flex justify-center space-x-3">
                    <button onClick={() => handleEditStudent(student)} className={`transition p-2 rounded-lg animate-hover ${isDarkMode ? 'bg-blue-900/30 text-blue-400 hover:bg-blue-900/50' : 'bg-blue-50 text-blue-500 hover:text-blue-700'}`} title="កែប្រែ">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDeleteConfirm(student.id)} className={`transition p-2 rounded-lg animate-hover ${isDarkMode ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' : 'bg-red-50 text-red-500 hover:text-red-700'}`} title="លុប">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-gray-500">មិនមានទិន្នន័យសិស្សទេ</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Student Modal Overlay */}
        {isStudentModalOpen && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className={`rounded-2xl w-full max-w-lg p-6 animate-fade-in shadow-xl text-left ${isDarkMode ? 'bg-[#1e293b] text-white border border-[#334155]' : 'bg-white text-gray-800'}`}>
              <div className={`flex justify-between items-center mb-6 border-b pb-4 ${isDarkMode ? 'border-[#334155]' : 'border-gray-100'}`}>
                <h3 className={`text-xl font-moul ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>{editingStudentId ? 'កែប្រែព័ត៌មានសិស្ស' : 'បន្ថែមសិស្សថ្មី'}</h3>
                <button onClick={() => setIsStudentModalOpen(false)} className="text-gray-400 hover:text-red-500 transition"><X size={24}/></button>
              </div>
              <form onSubmit={handleSaveStudent} className="space-y-4 font-siemreap">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block mb-1 font-bold">អត្តលេខ</label>
                    <input required type="text" name="studentId" value={studentForm.studentId} onChange={handleStudentFormChange} className={`w-full border rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition ${isDarkMode ? 'bg-[#0f172a] border-[#334155] text-white' : 'bg-gray-50 focus:bg-white border-gray-200'}`} placeholder="ឧ. STU001"/>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block mb-1 font-bold">កម្រិតថ្នាក់</label>
                    <input required type="text" name="grade" value={studentForm.grade} onChange={handleStudentFormChange} className={`w-full border rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition ${isDarkMode ? 'bg-[#0f172a] border-[#334155] text-white' : 'bg-gray-50 focus:bg-white border-gray-200'}`} placeholder="ឧ. ១១ក"/>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block mb-1 font-bold">ឈ្មោះសិស្ស</label>
                    <input required type="text" name="name" value={studentForm.name} onChange={handleStudentFormChange} className={`w-full border rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition ${isDarkMode ? 'bg-[#0f172a] border-[#334155] text-white' : 'bg-gray-50 focus:bg-white border-gray-200'}`} placeholder="ឧ. សុខ សាន្ត"/>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block mb-1 font-bold">ភេទ</label>
                    <select name="gender" value={studentForm.gender} onChange={handleStudentFormChange} className={`w-full border rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition ${isDarkMode ? 'bg-[#0f172a] border-[#334155] text-white' : 'bg-gray-50 focus:bg-white border-gray-200'}`}>
                      <option value="ប្រុស">ប្រុស</option>
                      <option value="ស្រី">ស្រី</option>
                    </select>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block mb-1 font-bold">ថ្ងៃខែឆ្នាំកំណើត</label>
                    <input required type="text" name="dob" value={studentForm.dob} onChange={handleStudentFormChange} className={`w-full border rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition ${isDarkMode ? 'bg-[#0f172a] border-[#334155] text-white' : 'bg-gray-50 focus:bg-white border-gray-200'}`} placeholder="ឧ. ១២-០៣-២០០៨"/>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block mb-1 font-bold">លេខទូរស័ព្ទ</label>
                    <input required type="text" name="phone" value={studentForm.phone} onChange={handleStudentFormChange} className={`w-full border rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition ${isDarkMode ? 'bg-[#0f172a] border-[#334155] text-white' : 'bg-gray-50 focus:bg-white border-gray-200'}`} placeholder="ឧ. 012 345 678"/>
                  </div>
                </div>
                <div className={`flex justify-end space-x-3 mt-6 pt-5 border-t ${isDarkMode ? 'border-[#334155]' : 'border-gray-100'}`}>
                  <button type="button" onClick={() => setIsStudentModalOpen(false)} className={`px-5 py-2 rounded-lg font-bold transition ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-gray-100 text-slate-700 hover:bg-gray-200'}`}>បោះបង់</button>
                  <button type="submit" className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-bold transition shadow-sm">រក្សាទុក</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderAttendance = () => {
    const presentCount = students.filter(s => attendance[s.id] === 'present').length;
    const absentCount = students.filter(s => attendance[s.id] === 'absent').length;
    const leaveCount = students.filter(s => attendance[s.id] === 'leave').length;

    return (
      <div className={`rounded-2xl shadow-sm border p-6 animate-fade-in text-left ${isDarkMode ? 'bg-[#1e293b] border-[#334155]' : 'bg-white border-gray-100'}`}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className={`text-2xl font-moul ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>ស្រង់វត្តមានសិស្ស</h2>
          
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2 items-center">
            {/* Day Selector */}
            <select 
              value={selectedDay} 
              onChange={(e) => setSelectedDay(e.target.value)} 
              className={`border rounded-lg px-3 py-2 font-siemreap outline-none focus:border-blue-500 text-sm ${isDarkMode ? 'bg-[#0f172a] border-[#334155] text-white' : 'bg-gray-50 text-gray-600 border-gray-200'}`}
            >
              {daysList.map(d => (
                <option key={d} value={d}>ថ្ងៃទី {d}</option>
              ))}
            </select>

            {/* Month Selector */}
            <select 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)} 
              className={`w-36 border rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition text-sm ${isDarkMode ? 'bg-[#0f172a] border-[#334155] text-white' : 'bg-gray-50 text-gray-600 border-gray-200'}`}
            >
              {khmerMonths.map(m => (
                <option key={m.value} value={m.value}>ខែ{m.label}</option>
              ))}
            </select>

            {/* Year Selector */}
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)} 
              className={`border rounded-lg px-3 py-2 font-siemreap outline-none focus:border-blue-500 text-sm ${isDarkMode ? 'bg-[#0f172a] border-[#334155] text-white' : 'bg-gray-50 text-gray-600 border-gray-200'}`}
            >
              {['2025', '2026', '2027', '2028'].map(y => (
                <option key={y} value={y}>ឆ្នាំ {y}</option>
              ))}
            </select>

            <button 
              onClick={handleSaveAttendance}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg font-siemreap hover:bg-blue-700 transition text-sm"
            >
              រក្សាទុក
            </button>
          </div>
        </div>

        {/* Dynamic Live Counters */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl text-center shadow-sm">
            <span className="block text-md font-bold text-emerald-800 font-moul mb-1">វត្តមាន</span>
            <span className="text-3xl font-extrabold text-emerald-600 font-siemreap">{presentCount} <span className="text-sm font-normal">នាក់</span></span>
          </div>
          <div className="bg-red-50 border border-red-100 p-4 rounded-2xl text-center shadow-sm">
            <span className="block text-md font-bold text-red-800 font-moul mb-1">អវត្តមាន</span>
            <span className="text-3xl font-extrabold text-red-600 font-siemreap">{absentCount} <span className="text-sm font-normal">នាក់</span></span>
          </div>
          <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl text-center shadow-sm">
            <span className="block text-md font-bold text-amber-800 font-moul mb-1">ច្បាប់</span>
            <span className="text-3xl font-extrabold text-amber-600 font-siemreap">{leaveCount} <span className="text-sm font-normal">នាក់</span></span>
          </div>
        </div>

        <div className="space-y-3 font-siemreap">
          {students.map((student, index) => {
            const currentStatus = attendance[student.id];
            return (
              <div key={student.id} className={`flex items-center justify-between p-4 border rounded-2xl hover:shadow-md transition duration-300 ${isDarkMode ? 'bg-[#0f172a]/30 border-[#334155]' : 'bg-gray-50/30 border-gray-100'}`}>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400 font-bold w-6">{index + 1}</span>
                  <span className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{student.name}</span>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => markAttendance(student.id, 'present')}
                    className={`px-4 py-2 rounded-xl border text-sm font-bold transition duration-300 ${
                      currentStatus === 'present' 
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200' 
                        : 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100'
                    }`}
                  >
                    វត្តមាន
                  </button>
                  <button 
                    onClick={() => markAttendance(student.id, 'absent')}
                    className={`px-4 py-2 rounded-xl border text-sm font-bold transition duration-300 ${
                      currentStatus === 'absent' 
                        ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-200' 
                        : 'bg-red-50 text-red-700 border-red-100 hover:bg-red-100'
                    }`}
                  >
                    អវត្តមាន
                  </button>
                  <button 
                    onClick={() => markAttendance(student.id, 'leave')}
                    className={`px-4 py-2 rounded-xl border text-sm font-bold transition duration-300 ${
                      currentStatus === 'leave' 
                        ? 'bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-200' 
                        : 'bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100'
                    }`}
                  >
                    ច្បាប់
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMonthlyScore = () => {
    const monthScores = studentScores[activeScoreMonthId] || {};
    const displayData = students.map((s) => {
      const scores = monthScores[s.id] || { kh: 0, math: 0, phy: 0, chem: 0, bio: 0, earth: 0, hist: 0, geo: 0, mor: 0, eng: 0 };
      const total = Object.values(scores).reduce((sum, val) => sum + val, 0);
      const average = (total / 8.4).toFixed(2);
      
      let result = "ខ្សោយ";
      if (average >= 42.5) result = "ល្អប្រសើរ";
      else if (average >= 35) result = "ល្អ";
      else if (average >= 25) result = "មធ្យម";

      return { ...s, scores, total, average: parseFloat(average), result };
    });

    const sortedByTotal = [...displayData].sort((a, b) => b.total - a.total);
    const rankedData = displayData.map(s => {
      const rank = sortedByTotal.findIndex(sorted => sorted.id === s.id) + 1;
      return { ...s, rank };
    });

    const finalDisplayData = rankedData.sort((a, b) => a.id - b.id);

    const topThree = [...rankedData].sort((a, b) => a.rank - b.rank).slice(0, 3);
    const top1 = topThree[0] || { name: 'គ្មានទិន្នន័យ', total: 0 };
    const top2 = topThree[1] || { name: 'គ្មានទិន្នន័យ', total: 0 };
    const top3 = topThree[2] || { name: 'គ្មានទិន្នន័យ', total: 0 };

    return (
      <div className="animate-fade-in text-center space-y-12">
        <div className="flex justify-between items-center px-2">
          <div className="flex gap-2 flex-wrap">
            {scoreMonths.map(m => (
              <button key={m.id} onClick={() => setActiveScoreMonthId(m.id)} className={`px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition ${activeScoreMonthId === m.id ? 'bg-blue-600 text-white' : (isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200')}`}>{m.name}</button>
            ))}
          </div>
          <button onClick={handleAddNewMonth} className="bg-emerald-600 hover:bg-emerald-700 text-white font-siemreap font-bold py-2.5 px-5 rounded-xl text-sm whitespace-nowrap shadow-md shadow-emerald-900/20">+ ខែបន្ទាប់</button>
        </div>

        <div>
          <h2 className="text-3xl font-moul text-yellow-600 mb-2">តារាងកិត្តិយសប្រចាំ{scoreMonths.find(m => m.id === activeScoreMonthId)?.name}</h2>
          <p className={`font-siemreap mb-10 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>សិស្សឆ្នើមដែលមានចំណាត់ថ្នាក់ល្អជាងគេប្រចាំខែ</p>
          
          <div className="flex flex-col md:flex-row justify-center items-end gap-6 px-4">
            <div className={`rounded-t-3xl shadow-lg border p-6 w-full md:w-1/4 transform hover:-translate-y-2 transition duration-300 relative order-2 md:order-1 pt-12 md:h-64 ${isDarkMode ? 'bg-[#1e293b] border-[#334155]' : 'bg-white border-gray-100'}`}>
               <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gray-200 border-4 border-white rounded-full flex items-center justify-center shadow-md"><span className="text-2xl font-bold text-gray-600 font-moul">២</span></div>
               <h3 className={`text-xl font-bold font-moul mt-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{top2.name}</h3>
               <p className={`font-siemreap mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>ពិន្ទុ៖ {top2.total}</p>
               <p className="text-sm font-siemreap text-blue-600 bg-blue-50 py-1 px-3 rounded-full inline-block mt-3">ខិតខំប្រឹងប្រែង</p>
            </div>

            <div className={`rounded-t-3xl shadow-xl border p-6 w-full md:w-1/3 transform hover:-translate-y-4 transition duration-300 relative order-1 md:order-2 pt-16 md:h-80 z-10 ${isDarkMode ? 'bg-gradient-to-t from-[#1e293b] to-[#1e293b]/30 border-yellow-500/50' : 'bg-gradient-to-t from-yellow-50 to-white border-yellow-200'}`}>
               <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-yellow-400 border-4 border-white rounded-full flex items-center justify-center shadow-lg"><Award size={40} className="text-white" /></div>
               <h3 className="text-2xl font-bold font-moul text-yellow-700 mt-2">{top1.name}</h3>
               <p className={`font-siemreap mt-2 text-lg ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>ពិន្ទុ៖ {top1.total}</p>
               <p className="text-md font-siemreap text-yellow-700 bg-yellow-100 py-1.5 px-4 rounded-full inline-block mt-4 font-bold">ឆ្នើមប្រចាំខែ</p>
            </div>

            <div className={`rounded-t-3xl shadow-lg border p-6 w-full md:w-1/4 transform hover:-translate-y-2 transition duration-300 relative order-3 pt-12 md:h-56 ${isDarkMode ? 'bg-[#1e293b] border-[#334155]' : 'bg-white border-gray-100'}`}>
               <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-orange-200 border-4 border-white rounded-full flex items-center justify-center shadow-md"><span className="text-2xl font-bold text-orange-700 font-moul">៣</span></div>
               <h3 className={`text-xl font-bold font-moul mt-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{top3.name}</h3>
               <p className={`font-siemreap mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>ពិន្ទុ៖ {top3.total}</p>
               <p className="text-sm font-siemreap text-orange-600 bg-orange-50 py-1 px-3 rounded-full inline-block mt-3 font-semibold">វិន័យល្អឥតខ្ចោះ</p>
            </div>
          </div>
        </div>

        <div className={`rounded-2xl shadow-sm border p-6 overflow-x-auto ${isDarkMode ? 'bg-[#1e293b] border-[#334155] text-white' : 'bg-white border-gray-100 text-gray-800'}`}>
          <div className="mb-6 flex justify-between items-start font-moul text-xs md:text-sm">
            <div className="space-y-1.5 text-left">
              <p>មន្ទីរអប់រំ យុវជន និងកីឡារាជធានីភ្នំពេញ</p>
              <p>ការិយាល័យអប់រំ យុវជន និងកីឡាខណ្ឌ ............</p>
              <p>សាលារៀន៖ វិទ្យាល័យ សន្តិភាព</p>
            </div>
            <div className="text-center">
              <p className="text-[15px] mb-1">ព្រះរាជាណាចក្រកម្ពុជា</p>
              <p className="text-[15px]">ជាតិ សាសនា ព្រះមហាក្សត្រ</p>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-moul mb-2">តារាងពិន្ទុប្រចាំ{scoreMonths.find(m => m.id === activeScoreMonthId)?.name}</h2>
            <p className="font-siemreap text-md">ថ្នាក់ទី៖ ១១ក ឆ្នាំសិក្សា ២០២៥-២០២៦</p>
          </div>

          <table className={`w-full text-center border-collapse border-2 ${isDarkMode ? 'border-slate-600' : 'border-black'} font-siemreap text-[13px] md:text-sm`}>
            <thead>
              <tr className={`font-moul text-xs md:text-[13px] ${isDarkMode ? 'bg-blue-900 text-white' : 'bg-[#00b0f0] text-black'}`}>
                <th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`} rowSpan={2}>ល.រ</th>
                <th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`} rowSpan={2}>គោត្តនាម និង នាម</th>
                <th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`} rowSpan={2}>ភេទ</th>
                <th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>ភាសាខ្មែរ</th><th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>គណិត</th><th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>រូប</th><th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>គីមី</th><th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>ជីវៈ</th><th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>ផែនដី</th><th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>ប្រវត្តិ</th><th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>ភូមិ</th><th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>សីលធម៌</th><th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>ភាសា</th>
                <th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`} rowSpan={2}>សរុប</th><th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`} rowSpan={2}>មធ្យម<br/>ភាគ</th><th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`} rowSpan={2}>ចំណាត់<br/>ថ្នាក់</th><th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`} rowSpan={2}>និទ្ទេស</th><th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`} rowSpan={2}>សកម្មភាព</th>
              </tr>
              <tr className={`font-bold text-xs md:text-sm ${isDarkMode ? 'bg-yellow-700 text-white' : 'bg-[#ffff00] text-black'}`}>
                <th className={`border-2 p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>100</th><th className={`border-2 p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>100</th><th className={`border-2 p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>35</th><th className={`border-2 p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>25</th><th className={`border-2 p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>35</th><th className={`border-2 p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>25</th><th className={`border-2 p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>33</th><th className={`border-2 p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>32</th><th className={`border-2 p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>35</th><th className={`border-2 p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>50</th>
              </tr>
            </thead>
            <tbody>
              {finalDisplayData.map((student, idx) => (
                <tr key={student.id} className={`border ${isDarkMode ? 'border-slate-600 hover:bg-slate-800' : 'border-black hover:bg-gray-50'}`}>
                  <td className={`border p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{idx + 1}</td>
                  <td className={`border p-2 text-left whitespace-nowrap font-medium ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{student.name}</td>
                  <td className={`border p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{student.gender === 'ប្រុស' ? 'ប' : 'ស'}</td>
                  <td className={`border p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{student.scores.kh}</td>
                  <td className={`border p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{student.scores.math}</td>
                  <td className={`border p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{student.scores.phy}</td>
                  <td className={`border p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{student.scores.chem}</td>
                  <td className={`border p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{student.scores.bio}</td>
                  <td className={`border p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{student.scores.earth}</td>
                  <td className={`border p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{student.scores.hist}</td>
                  <td className={`border p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{student.scores.geo}</td>
                  <td className={`border p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{student.scores.mor}</td>
                  <td className={`border p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{student.scores.eng}</td>
                  <td className={`border p-2 font-bold ${isDarkMode ? 'border-slate-600 text-blue-400' : 'border-black text-blue-700'}`}>{student.total}</td>
                  <td className={`border p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{student.average}</td>
                  <td className={`border p-2 font-bold ${isDarkMode ? 'border-slate-600 text-red-400' : 'border-black text-red-600'}`}>{student.rank}</td>
                  <td className={`border p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{student.result}</td>
                  <td className={`border p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>
                    <button onClick={() => handleEditScoresClick(student.id)} className={`p-1.5 rounded-lg transition-all duration-200 ${isDarkMode ? 'bg-blue-900/30 text-blue-400 hover:bg-blue-900/60' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`} title="បញ្ចូលពិន្ទុ"><Edit size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderSemesterScore = () => {
    const semScores = semesterScores[activeSemesterTabId] || {};
    const semScoreData = students.map((s) => {
      const scores = semScores[s.id] || { kh: 0, math: 0, phy: 0, chem: 0, bio: 0, earth: 0, hist: 0, geo: 0, mor: 0, eng: 0 };
      const total = Object.values(scores).reduce((sum, val) => sum + val, 0);
      const average = (total / 8.4).toFixed(2);
      
      let result = "ខ្សោយ";
      if (average >= 42.5) result = "ល្អប្រសើរ";
      else if (average >= 35) result = "ល្អ";
      else if (average >= 25) result = "មធ្យម";

      return { ...s, scores, total, average: parseFloat(average), result };
    });

    const sortedByTotal = [...semScoreData].sort((a, b) => b.total - a.total);
    const rankedData = semScoreData.map(s => {
      const rank = sortedByTotal.findIndex(sorted => sorted.id === s.id) + 1;
      return { ...s, rank };
    });

    const displayData = rankedData.sort((a, b) => a.id - b.id);

    const topThree = [...rankedData].sort((a, b) => a.rank - b.rank).slice(0, 3);
    const top1 = topThree[0] || { name: 'គ្មានទិន្នន័យ', total: 0 };
    const top2 = topThree[1] || { name: 'គ្មានទិន្នន័យ', total: 0 };
    const top3 = topThree[2] || { name: 'គ្មានទិន្នន័យ', total: 0 };

    return (
      <div className="animate-fade-in text-center space-y-12">
        <div className="flex justify-between items-center px-2">
          <div className="flex gap-2 flex-wrap">
            {semesterTabs.map(sTab => (
              <button key={sTab.id} onClick={() => setActiveSemesterTabId(sTab.id)} className={`px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition ${activeSemesterTabId === sTab.id ? 'bg-blue-600 text-white' : (isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200')}`}>{sTab.name}</button>
            ))}
          </div>
          <button onClick={handleAddNewSemester} className="bg-emerald-600 hover:bg-emerald-700 text-white font-siemreap font-bold py-2.5 px-5 rounded-xl text-sm whitespace-nowrap shadow-md shadow-emerald-900/20">+ ឆមាសបន្ទាប់</button>
        </div>

        <div>
          <h2 className="text-3xl font-moul text-yellow-600 mb-2">តារាងកិត្តិយសប្រឡង{semesterTabs.find(sTab => sTab.id === activeSemesterTabId)?.name}</h2>
          <p className={`font-siemreap mb-10 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>សិស្សឆ្នើមដែលមានចំណាត់ថ្នាក់ល្អជាងគេប្រចាំឆមាស</p>
          
          <div className="flex flex-col md:flex-row justify-center items-end gap-6 px-4">
            <div className={`rounded-t-3xl shadow-lg border p-6 w-full md:w-1/4 transform hover:-translate-y-2 transition duration-300 relative order-2 md:order-1 pt-12 md:h-64 ${isDarkMode ? 'bg-[#1e293b] border-[#334155]' : 'bg-white border-gray-100'}`}>
               <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gray-200 border-4 border-white rounded-full flex items-center justify-center shadow-md"><span className="text-2xl font-bold text-gray-600 font-moul">២</span></div>
               <h3 className={`text-xl font-bold font-moul mt-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{top2.name}</h3>
               <p className={`font-siemreap mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>ពិន្ទុ៖ {top2.total}</p>
               <p className="text-sm font-siemreap text-blue-600 bg-blue-50 py-1 px-3 rounded-full inline-block mt-3">ខិតខំប្រឹងប្រែង</p>
            </div>
            <div className={`rounded-t-3xl shadow-xl border p-6 w-full md:w-1/3 transform hover:-translate-y-4 transition duration-300 relative order-1 md:order-2 pt-16 md:h-80 z-10 ${isDarkMode ? 'bg-gradient-to-t from-[#1e293b] to-[#1e293b]/30 border-yellow-500/50' : 'bg-gradient-to-t from-yellow-50 to-white border-yellow-200'}`}>
               <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-yellow-400 border-4 border-white rounded-full flex items-center justify-center shadow-lg"><Award size={40} className="text-white" /></div>
               <h3 className="text-2xl font-bold font-moul text-yellow-700 mt-2">{top1.name}</h3>
               <p className={`font-siemreap mt-2 text-lg ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>ពិន្ទុ៖ {top1.total}</p>
               <p className="text-md font-siemreap text-yellow-700 bg-yellow-100 py-1.5 px-4 rounded-full inline-block mt-4 font-bold">ឆ្នើមប្រចាំឆមាស</p>
            </div>
            <div className={`rounded-t-3xl shadow-lg border p-6 w-full md:w-1/4 transform hover:-translate-y-2 transition duration-300 relative order-3 pt-12 md:h-56 ${isDarkMode ? 'bg-[#1e293b] border-[#334155]' : 'bg-white border-gray-100'}`}>
               <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-orange-200 border-4 border-white rounded-full flex items-center justify-center shadow-md"><span className="text-2xl font-bold text-orange-700 font-moul">៣</span></div>
               <h3 className={`text-xl font-bold font-moul mt-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{top3.name}</h3>
               <p className={`font-siemreap mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>ពិន្ទុ៖ {top3.total}</p>
               <p className="text-sm font-siemreap text-orange-600 bg-orange-50 py-1 px-3 rounded-full inline-block mt-3 font-semibold">វិន័យល្អឥតខ្ចោះ</p>
            </div>
          </div>
        </div>

        <div className={`rounded-2xl shadow-sm border p-6 overflow-x-auto ${isDarkMode ? 'bg-[#1e293b] border-[#334155] text-white' : 'bg-white border-gray-100 text-gray-800'}`}>
          <div className="mb-6 flex justify-between items-start font-moul text-xs md:text-sm">
            <div className="space-y-1.5 text-left">
              <p>មន្ទីរអប់រំ យុវជន និងកីឡារាជធានីភ្នំពេញ</p>
              <p>ការិយាល័យអប់រំ យុវជន និងកីឡាខណ្ឌ ............</p>
              <p>សាលារៀន៖ វិទ្យាល័យ សន្តិភាព</p>
            </div>
            <div className="text-center">
              <p className="text-[15px] mb-1">ព្រះរាជាណាចក្រកម្ពុជា</p>
              <p className="text-[15px]">ជាតិ សាសនា ព្រះមហាក្សត្រ</p>
            </div>
          </div>
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-moul mb-2">តារាងពិន្ទុប្រឡង{semesterTabs.find(sTab => sTab.id === activeSemesterTabId)?.name}</h2>
            <p className="font-siemreap text-md">ថ្នាក់ទី៖ ១១ក ឆ្នាំសិក្សា ២០២៥-២០២៦</p>
          </div>

          <table className={`w-full text-center border-collapse border-2 ${isDarkMode ? 'border-slate-600' : 'border-black'} font-siemreap text-[13px] md:text-sm`}>
            <thead>
              <tr className={`font-moul text-xs md:text-[13px] ${isDarkMode ? 'bg-blue-900 text-white' : 'bg-[#00b0f0] text-black'}`}>
                <th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`} rowSpan={2}>ល.រ</th>
                <th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`} rowSpan={2}>គោត្តនាម និង នាម</th>
                <th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`} rowSpan={2}>ភេទ</th>
                <th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>ភាសាខ្មែរ</th><th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>គណិត</th><th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>រូប</th><th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>គីមី</th><th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>ជីវៈ</th><th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>ផែនដី</th><th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>ប្រវត្តិ</th><th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>ភូមិ</th><th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>សីលធម៌</th><th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>ភាសា</th>
                <th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`} rowSpan={2}>សរុប</th><th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`} rowSpan={2}>មធ្យម<br/>ភាគ</th><th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`} rowSpan={2}>ចំណាត់<br/>ថ្នាក់</th><th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`} rowSpan={2}>និទ្ទេស</th><th className={`border-2 p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`} rowSpan={2}>សកម្មភាព</th>
              </tr>
              <tr className={`font-bold text-xs md:text-sm ${isDarkMode ? 'bg-yellow-700 text-white' : 'bg-[#ffff00] text-black'}`}>
                <th className={`border-2 p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>100</th><th className={`border-2 p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>100</th><th className={`border-2 p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>35</th><th className={`border-2 p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>25</th><th className={`border-2 p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>35</th><th className={`border-2 p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>25</th><th className={`border-2 p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>33</th><th className={`border-2 p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>32</th><th className={`border-2 p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>35</th><th className={`border-2 p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>50</th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((student, idx) => (
                <tr key={student.id} className={`border ${isDarkMode ? 'border-slate-600 hover:bg-slate-800' : 'border-black hover:bg-gray-50'}`}>
                  <td className={`border p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{idx + 1}</td>
                  <td className={`border p-2 text-left whitespace-nowrap font-medium ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{student.name}</td>
                  <td className={`border p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{student.gender === 'ប្រុស' ? 'ប' : 'ស'}</td>
                  <td className={`border p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{student.scores.kh}</td>
                  <td className={`border p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{student.scores.math}</td>
                  <td className={`border p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{student.scores.phy}</td>
                  <td className={`border p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{student.scores.chem}</td>
                  <td className={`border p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{student.scores.bio}</td>
                  <td className={`border p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{student.scores.earth}</td>
                  <td className={`border p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{student.scores.hist}</td>
                  <td className={`border p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{student.scores.geo}</td>
                  <td className={`border p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{student.scores.mor}</td>
                  <td className={`border p-1.5 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{student.scores.eng}</td>
                  <td className={`border p-2 font-bold ${isDarkMode ? 'border-slate-600 text-blue-400' : 'border-black text-blue-700'}`}>{student.total}</td>
                  <td className={`border p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{student.average}</td>
                  <td className={`border p-2 font-bold ${isDarkMode ? 'border-slate-600 text-red-400' : 'border-black text-red-600'}`}>{student.rank}</td>
                  <td className={`border p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>{student.result}</td>
                  <td className={`border p-2 ${isDarkMode ? 'border-slate-600' : 'border-black'}`}>
                    <button onClick={() => handleEditSemesterScoresClick(student.id)} className={`p-1.5 rounded-lg transition-all duration-200 ${isDarkMode ? 'bg-blue-900/30 text-blue-400 hover:bg-blue-900/60' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`} title="បញ្ចូលពិន្ទុ"><Edit size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderStatistics = () => {
    const gradesCount = { A: 0, B: 0, C: 0, D: 0, F: 0 };
    students.forEach(s => {
      const scores = studentScores[activeScoreMonthId]?.[s.id] || { kh: 0, math: 0, phy: 0, chem: 0, bio: 0, earth: 0, hist: 0, geo: 0, mor: 0, eng: 0 };
      const total = Object.values(scores).reduce((sum, val) => sum + val, 0);
      const avg = total / 8.4;
      if (avg >= 42.5) gradesCount.A += 1;
      else if (avg >= 35) gradesCount.B += 1;
      else if (avg >= 28) gradesCount.C += 1;
      else if (avg >= 20) gradesCount.D += 1;
      else gradesCount.F += 1;
    });

    const maxGradeCount = Math.max(...Object.values(gradesCount), 1);
    const femaleCount = students.filter(s => s.gender === 'ស្រី').length;
    const maleCount = students.filter(s => s.gender === 'ប្រុស').length;
    const totalCount = students.length || 1;
    const malePct = Math.round((maleCount / totalCount) * 100);
    const femalePct = Math.round((femaleCount / totalCount) * 100);

    const attPresent = students.filter(s => attendance[s.id] === 'present').length;
    const attAbsent = students.filter(s => attendance[s.id] === 'absent').length;
    const attLeave = students.filter(s => attendance[s.id] === 'leave').length;

    return (
      <div className="space-y-8 animate-fade-in text-left">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-l-4 border-emerald-500 pl-3 mb-2">
          <div>
            <h2 className={`text-2xl font-moul ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>ស្ថិតិ និងការវិភាគទិន្នន័យក្នុងថ្នាក់</h2>
            <p className="font-siemreap text-sm text-gray-500 mt-1">លទ្ធផលបង្ហាញតាមលក្ខណៈក្រាហ្វិកគំរូជាក់ស្តែង</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 font-siemreap">
          <div className={`p-5 rounded-2xl border shadow-sm flex items-center justify-between ${isDarkMode ? 'bg-[#1e293b] border-[#334155]' : 'bg-white'}`}>
            <div>
              <span className="text-gray-400 block text-sm">អត្រាអ្នកជាប់សរុប</span>
              <strong className="text-2xl font-extrabold text-emerald-500">100%</strong>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500"><TrendingUp size={24}/></div>
          </div>
          <div className={`p-5 rounded-2xl border shadow-sm flex items-center justify-between ${isDarkMode ? 'bg-[#1e293b] border-[#334155]' : 'bg-white'}`}>
            <div>
              <span className="text-gray-400 block text-sm">មធ្យមភាគរួមថ្នាក់</span>
              <strong className="text-2xl font-extrabold text-blue-500">36.45</strong>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500"><BarChart2 size={24}/></div>
          </div>
          <div className={`p-5 rounded-2xl border shadow-sm flex items-center justify-between ${isDarkMode ? 'bg-[#1e293b] border-[#334155]' : 'bg-white'}`}>
            <div>
              <span className="text-gray-400 block text-sm">អត្រាវត្តមានសរុប</span>
              <strong className="text-2xl font-extrabold text-amber-500">92.4%</strong>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500"><CalendarCheck size={24}/></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className={`p-6 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-[#1e293b] border-[#334155]' : 'bg-white'}`}>
            <h3 className="text-md font-moul text-gray-400 mb-8 flex items-center"><BarChart size={18} className="mr-2 text-blue-500" /> ក្រាហ្វិកជួរឈរ៖ ស្ថិតិលទ្ធផលសិក្សាតាមកម្រិតនិទ្ទេស</h3>
            <div className="h-64 flex items-end justify-around px-4 border-b border-gray-200 pb-2">
              <div className="flex flex-col items-center w-12 group">
                <span className="text-xs font-bold text-gray-500 mb-1">{gradesCount.A} នាក់</span>
                <div style={{ height: `${(gradesCount.A / maxGradeCount) * 180}px`, minHeight: '15px' }} className="w-full bg-gradient-to-t from-red-600 to-red-400 rounded-t-lg shadow-md group-hover:brightness-110 transition-all duration-300"></div>
                <span className="text-sm font-bold mt-2 font-moul text-red-500">ល្អប្រសើរ</span>
              </div>
              <div className="flex flex-col items-center w-12 group">
                <span className="text-xs font-bold text-gray-500 mb-1">{gradesCount.B} នាក់</span>
                <div style={{ height: `${(gradesCount.B / maxGradeCount) * 180}px`, minHeight: '15px' }} className="w-full bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-t-lg shadow-md group-hover:brightness-110 transition-all duration-300"></div>
                <span className="text-sm font-bold mt-2 font-moul text-yellow-500">ល្អ</span>
              </div>
              <div className="flex flex-col items-center w-12 group">
                <span className="text-xs font-bold text-gray-500 mb-1">{gradesCount.C} នាក់</span>
                <div style={{ height: `${(gradesCount.C / maxGradeCount) * 180}px`, minHeight: '15px' }} className="w-full bg-gradient-to-t from-emerald-500 to-emerald-300 rounded-t-lg shadow-md group-hover:brightness-110 transition-all duration-300"></div>
                <span className="text-sm font-bold mt-2 font-moul text-emerald-600">មធ្យម</span>
              </div>
              <div className="flex flex-col items-center w-12 group">
                <span className="text-xs font-bold text-gray-500 mb-1">{gradesCount.D} នាក់</span>
                <div style={{ height: `${(gradesCount.D / maxGradeCount) * 180}px`, minHeight: '15px' }} className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg shadow-md group-hover:brightness-110 transition-all duration-300"></div>
                <span className="text-sm font-bold mt-2 font-moul text-blue-500">ខ្សោយ</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center font-siemreap">អ័ក្សដេកបង្ហាញពីកម្រិតលទ្ធផលសម្រេចបានរបស់សិស្សានុសិស្ស</p>
          </div>

          <div className={`p-6 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-[#1e293b] border-[#334155]' : 'bg-white'}`}>
            <h3 className="text-md font-moul text-gray-400 mb-8 flex items-center"><PieChart size={18} className="mr-2 text-purple-500" /> ក្រាហ្វិកវង់៖ សមាមាត្រយេនឌ័រ (ប្រុស/ស្រី)</h3>
            <div className="h-64 flex flex-col sm:flex-row items-center justify-center gap-8">
              <div className="relative w-40 h-40 rounded-full flex items-center justify-center border-4 border-slate-700/10 shadow-inner" style={{ background: `conic-gradient(#3b82f6 0% ${malePct}%, #ec4899 ${malePct}% 100%)` }}>
                <div className={`w-24 h-24 rounded-full flex flex-col items-center justify-center shadow ${isDarkMode ? 'bg-[#1e293b]' : 'bg-white'}`}>
                  <span className="text-xs text-gray-400">សិស្សសរុប</span>
                  <strong className="text-xl font-black">{students.length} នាក់</strong>
                </div>
              </div>
              <div className="space-y-3 font-siemreap text-sm">
                <div className="flex items-center space-x-3"><div className="w-4 h-4 bg-blue-500 rounded-full"></div><span>សិស្សប្រុស៖ <strong>{maleCount} នាក់ ({malePct}%)</strong></span></div>
                <div className="flex items-center space-x-3"><div className="w-4 h-4 bg-pink-500 rounded-full"></div><span>សិស្សស្រី៖ <strong>{femaleCount} នាក់ ({femalePct}%)</strong></span></div>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl border shadow-sm lg:col-span-2 ${isDarkMode ? 'bg-[#1e293b] border-[#334155]' : 'bg-white'}`}>
            <h3 className="text-md font-moul text-gray-400 mb-6 flex items-center"><TrendingUp size={18} className="mr-2 text-amber-500" /> ក្រាហ្វិកខ្សែ៖ និន្នាការតាមដានស្ថានភាពវត្តមានប្រចាំថ្ងៃ</h3>
            <div className="p-4 rounded-xl border border-dashed border-gray-300/60 bg-gray-50/20">
              <div className="grid grid-cols-3 gap-4 text-center font-siemreap text-xs">
                <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">វត្តមានថ្ងៃនេះ៖ <strong>{attPresent} នាក់</strong></div>
                <div className="p-3 bg-amber-50 text-amber-700 rounded-xl">ច្បាប់ថ្ងៃនេះ៖ <strong>{attLeave} នាក់</strong></div>
                <div className="p-3 bg-red-50 text-red-700 rounded-xl">អវត្តមានថ្ងៃនេះ៖ <strong>{attAbsent} នាក់</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStudentResults = () => {
    const overallData = students.map((s) => {
      const sem1Scores = semesterScores[1]?.[s.id] || { kh: 0, math: 0, phy: 0, chem: 0, bio: 0, earth: 0, hist: 0, geo: 0, mor: 0, eng: 0 };
      const sem1Total = Object.values(sem1Scores).reduce((sum, val) => sum + val, 0);
      const sem1Avg = sem1Total / 8.4;
      const overallAvg = sem1Avg.toFixed(2);
      const isPassed = overallAvg >= 25.00;

      return {
        ...s,
        overallAvg: parseFloat(overallAvg),
        status: isPassed ? 'ជាប់' : 'ធ្លាក់',
        statusColor: isPassed ? 'text-emerald-600' : 'text-red-500'
      };
    });

    const sortedByRank = [...overallData].sort((a, b) => b.overallAvg - a.overallAvg);
    const rankedData = overallData.map(s => ({ ...s, rank: sortedByRank.findIndex(sorted => sorted.id === s.id) + 1 }));
    const finalDisplayData = rankedData.sort((a, b) => a.id - b.id);

    return (
      <div className={`rounded-2xl shadow-sm border p-6 overflow-x-auto animate-fade-in text-left ${isDarkMode ? 'bg-[#1e293b] border-[#334155]' : 'bg-white'}`}>
        <h2 className={`text-xl font-moul text-center mb-6 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>សន្លឹកបូកសរុបលទ្ធផលសិស្សចុងក្រោយ</h2>
        <table className={`w-full text-center border-collapse border font-siemreap text-sm ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
          <thead>
            <tr className={`${isDarkMode ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-800'}`}>
              <th className="p-3 border">ល.រ</th><th className="p-3 border text-left">ឈ្មោះសិស្ស</th><th className="p-3 border">ភេទ</th><th className="p-3 border">មធ្យមភាគរួម</th><th className="p-3 border">ចំណាត់ថ្នាក់រួម</th><th className="p-3 border">លទ្ធផលចុងក្រោយ</th>
            </tr>
          </thead>
          <tbody>
            {finalDisplayData.map((s, idx) => (
              <tr key={s.id} className={`border-b ${isDarkMode ? 'border-slate-700 hover:bg-slate-800/50' : 'hover:bg-slate-50'}`}>
                <td className="p-3 border">{idx+1}</td><td className="p-3 border text-left font-bold">{s.name}</td><td className="p-3 border">{s.gender}</td><td className="p-3 border font-bold text-blue-500">{s.overallAvg}</td><td className="p-3 border font-bold text-red-500">{s.rank}</td><td className={`p-3 border font-bold ${s.statusColor}`}>{s.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderSubjects = () => (
    <div className="animate-fade-in text-left">
      <h2 className={`text-2xl font-moul mb-6 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>មុខវិជ្ជាសិក្សាទូទៅ</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((sub, index) => (
          <div key={index} className={`rounded-2xl p-6 border shadow-sm hover:shadow-md transition cursor-pointer flex flex-col items-center text-center ${sub.color} bg-opacity-30`}>
            <BookOpen size={40} className="mb-4 opacity-80" />
            <h3 className="text-xl font-bold font-moul mb-2">{sub.name}</h3>
            <p className="font-siemreap font-medium opacity-80 pb-4 border-b border-current w-full">បង្រៀនដោយ៖ {sub.teacher}</p>
            <button onClick={() => sub.link && window.open(sub.link, '_blank')} className="mt-4 font-siemreap text-sm bg-white bg-opacity-50 px-4 py-2 rounded-lg font-bold hover:bg-opacity-80 transition">ចូលមើលមេរៀន</button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className={`rounded-2xl shadow-sm border p-8 animate-fade-in ${isDarkMode ? 'bg-[#1e293b] border-[#334155] text-white' : 'bg-white border-gray-100 text-gray-800'}`}>
      <div className="max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Info size={40} className="text-blue-600" />
        </div>
        <h2 className="text-2xl md:text-3xl font-moul text-blue-900 mb-8 text-center border-b pb-6">ក្រុមបង្កើតវេបសាយសាលារៀន</h2>
        <div className={`p-6 md:p-10 rounded-2xl border ${isDarkMode ? 'bg-[#0f172a] border-[#334155]' : 'bg-gray-50/80 border-gray-100 shadow-inner'}`}>
          <ul className="space-y-4 font-siemreap text-lg md:text-xl">
            <li className="flex items-start"><span className="font-bold text-blue-600 mr-3 w-6">1.</span><span>ខឿន សុខេន (ប្រធាន)</span></li>
            <li className="flex items-start"><span className="font-bold text-blue-600 mr-3 w-6">2.</span><span>ហួយ វាសនា (អនុប្រធាន)</span></li>
            <li className="flex items-start"><span className="font-bold text-blue-600 mr-3 w-6">3.</span><span>ហៀង លាងហៃ (Design web site )</span></li>
            <li className="flex items-start"><span className="font-bold text-blue-600 mr-3 w-6">4.</span><span>ចំណាន ណុបដាណែ (ស្រាវជ្រាវឯកសារ)</span></li>
            <li className="flex items-start"><span className="font-bold text-blue-600 mr-3 w-6">5.</span><span>ហ៊ាង ហនុ (ស្រាវជ្រាវឯកសារ)</span></li>
            <li className="flex items-start"><span className="font-bold text-blue-600 mr-3 w-6">6.</span><span>ជួន សុភ័ក្រ្តា (ស្រាវជ្រាវឯកសារ)</span></li>
            <li className="flex items-start"><span className="font-bold text-blue-600 mr-3 w-6">7.</span><span>នឹម ម៉ណាត់ (ស្រាវជ្រាវឯកសារ)</span></li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return renderHome();
      case 'my_class': return renderAdmin();
      case 'students': return renderStudentList();
      case 'subjects': return renderSubjects();
      case 'attendance': return renderAttendance();
      case 'monthly_score': return renderMonthlyScore();
      case 'semester_score': return renderSemesterScore();
      case 'statistics': return renderStatistics();
      case 'results': return renderStudentResults();
      case 'about': return renderAbout();
      default: return renderHome();
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Moul&family=Siemreap&display=swap');
        .font-moul { font-family: 'Khmer OS Moul light', 'Moul', cursive; }
        .font-siemreap { font-family: 'Khmer OS Siemreap', 'Siemreap', sans-serif; }
        .animate-fade-in { animation: fadeIn 0.4s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        body { background-color: #f3f4f6; }
        .animate-hover { transition: transform 0.2s ease-in-out; }
        .animate-hover:hover { transform: scale(1.1); }
      `}} />

      <div className={`flex h-screen font-siemreap ${isDarkMode ? 'bg-[#0f172a] text-[#f8fafc]' : 'bg-[#f3f4f6] text-gray-800'}`}>
        
        <aside className="hidden md:flex flex-col w-72 bg-[#16211e] text-gray-300 shadow-xl z-20">
          <div className="p-6 flex flex-col items-center border-b border-[#253630] bg-[#16211e] text-white">
            <label className="relative w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center font-moul text-2xl shadow-inner mb-3 cursor-pointer overflow-hidden group">
              <img src={teacherImage} alt="Logo" className="w-full h-full object-cover"/>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Edit size={20} className="text-white"/></div>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
            <h1 className="font-moul text-xl text-center">សាលា Digital</h1>
            <input 
              type="text" value={teacherName} onChange={(e) => setTeacherName(e.target.value)}
              placeholder="បំពេញឈ្មោះគ្រូបន្ទុកថ្នាក់" 
              className="mt-2 text-center text-sm font-siemreap bg-transparent border-b border-[#253630] outline-none text-[#8ba39a] focus:text-white pb-1 focus:border-[#8ba39a] transition-colors placeholder:text-xs"
            />
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-1 bg-[#16211e] flex flex-col">
            <SidebarItem id="home" icon={LayoutDashboard} label="ផ្ទាំងគ្រូ" />
            <SidebarItem id="my_class" icon={School} label="ថ្នាក់របស់ខ្ញុំ" />
            <SidebarItem id="students" icon={GraduationCap} label="សិស្សក្នុងថ្នាក់" />
            <SidebarItem id="subjects" icon={BookOpen} label="មុខវិជ្ជា" />
            <SidebarItem id="attendance" icon={CalendarCheck} label="វត្តមាន" />
            <SidebarItem id="monthly_score" icon={ClipboardList} label="ពិន្ទុខែ" />
            <SidebarItem id="semester_score" icon={ClipboardList} label="ពិន្ទុប្រឡងឆមាស" />
            <SidebarItem id="statistics" icon={BarChart} label="ស្ថិតិ" />
            <SidebarItem id="results" icon={BarChart2} label="លទ្ធផលសិស្ស" />
            <SidebarItem id="about" icon={Info} label="អំពីអ្នកបង្កើត" />
            
            <div className="mt-auto pt-4 border-t border-[#253630] space-y-1">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 text-[#8ba39a] hover:bg-[#202e2a] hover:text-gray-200 font-siemreap">
                {isDarkMode ? <><Sun size={20} className="text-[#8ba39a]" /><span className="text-[15px]">ផ្ទាំងភ្លឺ</span></> : <><Moon size={20} className="text-[#8ba39a]" /><span className="text-[15px]">ផ្ទាំងងងឹត</span></>}
              </button>
              <SidebarItem id="logout" icon={LogOut} label="ចាកចេញ" />
            </div>
          </div>
        </aside>

        <aside className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} w-72 bg-[#16211e] shadow-2xl z-50 transition-transform duration-300 md:hidden flex flex-col`}>
          <div className="p-6 bg-[#16211e] text-white flex justify-between items-start border-b border-[#253630]">
             <div>
                <h1 className="font-moul text-xl">សាលា Digital</h1>
                <input 
                  type="text" value={teacherName} onChange={(e) => setTeacherName(e.target.value)}
                  placeholder="បំពេញឈ្មោះគ្រូបន្ទុកថ្នាក់" 
                  className="mt-2 text-left text-sm font-siemreap bg-transparent border-b border-[#253630] outline-none text-[#8ba39a] focus:text-white pb-1 focus:border-[#8ba39a] transition-colors placeholder:text-xs w-full"
                />
             </div>
             <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-white p-1 rounded"><X size={24}/></button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1 bg-[#16211e] flex flex-col">
            <SidebarItem id="home" icon={LayoutDashboard} label="ផ្ទាំងគ្រូ" />
            <SidebarItem id="my_class" icon={School} label="ថ្នាក់របស់ខ្ញុំ" />
            <SidebarItem id="students" icon={GraduationCap} label="សិស្សក្នុងថ្នាក់" />
            <SidebarItem id="subjects" icon={BookOpen} label="មុខវិជ្ជា" />
            <SidebarItem id="attendance" icon={CalendarCheck} label="វត្តមាន" />
            <SidebarItem id="monthly_score" icon={ClipboardList} label="ពិន្ទុខែ" />
            <SidebarItem id="semester_score" icon={ClipboardList} label="ពិន្ទុប្រឡងឆមាស" />
            <SidebarItem id="statistics" icon={BarChart} label="ស្ថិតិ" />
            <SidebarItem id="results" icon={BarChart2} label="លទ្ធផលសិស្ស" />
            <SidebarItem id="about" icon={Info} label="អំពីអ្នកបង្កើត" />
            <div className="mt-auto pt-4 border-t border-[#253630] space-y-1">
              <button onClick={() => { setIsDarkMode(!isDarkMode); setIsMobileMenuOpen(false); }} className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 text-[#8ba39a] hover:bg-[#202e2a] hover:text-gray-200 font-siemreap">
                {isDarkMode ? <><Sun size={20} className="text-[#8ba39a]" /><span className="text-[15px]">ផ្ទាំងភ្លឺ</span></> : <><Moon size={20} className="text-[#8ba39a]" /><span className="text-[15px]">ផ្ទាំងងងឹត</span></>}
              </button>
              <SidebarItem id="logout" icon={LogOut} label="ចាកចេញ" />
            </div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
          <header className={`shadow-sm p-4 md:px-8 flex justify-between items-center z-10 sticky top-0 transition-colors duration-300 ${isDarkMode ? 'bg-[#1e293b] border-b border-[#334155] text-white' : 'bg-white border-b border-gray-100 text-gray-800'}`}>
            <div className="flex items-center">
              <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden mr-4 text-gray-600 hover:text-blue-600"><Menu size={28} /></button>
              <h2 className={`text-xl md:text-2xl font-moul hidden sm:block ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
                {activeTab === 'home' && 'ផ្ទាំងគ្រូ'}
                {activeTab === 'my_class' && 'ថ្នាក់របស់ខ្ញុំ'}
                {activeTab === 'students' && 'សិស្សក្នុងថ្នាក់'}
                {activeTab === 'subjects' && 'មុខវិជ្ជា'}
                {activeTab === 'attendance' && 'វត្តមាន'}
                {activeTab === 'monthly_score' && 'ពិន្ទុខែ'}
                {activeTab === 'semester_score' && 'ពិន្ទុប្រឡងឆមាស'}
                {activeTab === 'statistics' && 'ស្ថិតិ'}
                {activeTab === 'results' && 'លទ្ធផលសិស្ស'}
                {activeTab === 'about' && 'អំពីអ្នកបង្កើត'}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`font-siemreap font-bold hidden md:block ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>{teacherName || 'លោកគ្រូ / អ្នកគ្រូ បន្ទុកថ្នាក់'}</span>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center border-2 border-blue-500 cursor-pointer overflow-hidden">
                <img src={teacherImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          </header>

          <div className={`flex-1 overflow-y-auto p-4 md:p-8 transition-colors duration-300 ${isDarkMode ? 'bg-[#0f172a]' : 'bg-gray-50/50'}`}>
            <div className="max-w-6xl mx-auto pb-10">{renderContent()}</div>
          </div>
        </main>
      </div>

      {/* Student Delete Confirmation Modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 animate-fade-in shadow-xl text-center">
            <h3 className="text-xl font-moul text-red-600 mb-4">លុបព័ត៌មានសិស្ស</h3>
            <p className="font-siemreap text-gray-600 mb-6">តើអ្នកពិតជាចង់លុបទិន្នន័យសិស្សនេះមែនទេ? សកម្មភាពនេះមិនអាចត្រឡប់ក្រោយបានឡើយ។</p>
            <div className="flex justify-center space-x-4 font-siemreap font-bold">
              <button onClick={() => setDeleteConfirmId(null)} className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition">បោះបង់</button>
              <button onClick={executeDeleteStudent} className="px-5 py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 transition shadow-md shadow-red-900/20">លុបចោល</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Scores Modal Window */}
      {isScoreModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className={`rounded-3xl w-full max-w-2xl p-6 animate-fade-in shadow-2xl text-left border ${
            isDarkMode ? 'bg-[#1e293b] text-white border-slate-700' : 'bg-white text-slate-800 border-slate-100'
          }`}>
            <div className={`flex justify-between items-center mb-6 border-b pb-4 ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
              <h3 className="text-xl font-moul text-blue-600 flex items-center">
                <ClipboardList className="mr-2" size={24} />
                កែប្រែពិន្ទុរបស់សិស្ស៖ {students.find(s => s.id === editingScoreStudentId)?.name}
              </h3>
              <button onClick={() => setIsScoreModalOpen(false)} className="text-slate-400 hover:text-red-500 transition-colors"><X size={24} /></button>
            </div>
            <form onSubmit={handleSaveScoresSubmit} className="space-y-6 font-siemreap">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {['kh', 'math', 'phy', 'chem', 'bio', 'earth', 'hist', 'geo', 'mor', 'eng'].map((subj) => (
                  <div key={subj}>
                    <label className="block text-xs font-bold mb-1 uppercase">{subj === 'kh' ? 'ខ្មែរ' : subj === 'math' ? 'គណិត' : subj === 'phy' ? 'រូប' : subj === 'chem' ? 'គីមី' : subj === 'bio' ? 'ជីវៈ' : subj === 'earth' ? 'ផែនដី' : subj === 'hist' ? 'ប្រវត្តិ' : subj === 'geo' ? 'ភូមិ' : subj === 'mor' ? 'សីលធម៌' : 'អង់គ្លេស'}</label>
                    <input required type="number" min="0" max={subj === 'eng' ? 50 : (subj === 'hist' ? 33 : (subj === 'geo' ? 32 : (subj === 'kh' || subj === 'math' ? 100 : (subj === 'phy' || subj === 'bio' || subj === 'mor' ? 35 : 25))))} name={subj} value={scoreForm[subj]} onChange={handleScoreFormChange} className={`w-full border rounded-xl px-3 py-2 outline-none focus:border-blue-500 text-sm ${isDarkMode ? 'bg-[#0f172a] border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`} />
                  </div>
                ))}
              </div>
              <div className={`flex justify-end space-x-3 pt-5 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                <button type="button" onClick={() => setIsScoreModalOpen(false)} className={`px-5 py-2.5 rounded-xl font-bold transition-all duration-200 ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>បោះបង់</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all duration-200 shadow-md shadow-blue-900/30">រក្សាទុកពិន្ទុ</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Semester Scores Modal Window */}
      {isSemesterScoreModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className={`rounded-3xl w-full max-w-2xl p-6 animate-fade-in shadow-2xl text-left border ${
            isDarkMode ? 'bg-[#1e293b] text-white border-slate-700' : 'bg-white text-slate-800 border-slate-100'
          }`}>
            <div className={`flex justify-between items-center mb-6 border-b pb-4 ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
              <h3 className="text-xl font-moul text-blue-600 flex items-center">
                <ClipboardList className="mr-2" size={24} />
                កែប្រែពិន្ទុឆមាសរបស់សិស្ស៖ {students.find(s => s.id === editingSemesterScoreStudentId)?.name}
              </h3>
              <button onClick={() => setIsSemesterScoreModalOpen(false)} className="text-slate-400 hover:text-red-500 transition-colors"><X size={24} /></button>
            </div>
            <form onSubmit={handleSaveSemesterScoresSubmit} className="space-y-6 font-siemreap">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {['kh', 'math', 'phy', 'chem', 'bio', 'earth', 'hist', 'geo', 'mor', 'eng'].map((subj) => (
                  <div key={subj}>
                    <label className="block text-xs font-bold mb-1 uppercase">{subj === 'kh' ? 'ខ្មែរ' : subj === 'math' ? 'គណិត' : subj === 'phy' ? 'រូប' : subj === 'chem' ? 'គីមី' : subj === 'bio' ? 'ជីវៈ' : subj === 'earth' ? 'ផែនដី' : subj === 'hist' ? 'ប្រវត្តិ' : subj === 'geo' ? 'ភូមិ' : subj === 'mor' ? 'សីលធម៌' : 'អង់គ្លេស'}</label>
                    <input required type="number" min="0" max={subj === 'eng' ? 50 : (subj === 'hist' ? 33 : (subj === 'geo' ? 32 : (subj === 'kh' || subj === 'math' ? 100 : (subj === 'phy' || subj === 'bio' || subj === 'mor' ? 35 : 25))))} name={subj} value={semesterScoreForm[subj]} onChange={handleSemesterScoreFormChange} className={`w-full border rounded-xl px-3 py-2 outline-none focus:border-blue-500 text-sm ${isDarkMode ? 'bg-[#0f172a] border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`} />
                  </div>
                ))}
              </div>
              <div className={`flex justify-end space-x-3 pt-5 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                <button type="button" onClick={() => setIsSemesterScoreModalOpen(false)} className={`px-5 py-2.5 rounded-xl font-bold transition-all duration-200 ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>បោះបង់</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all duration-200 shadow-md shadow-blue-900/30">រក្សាទុកពិន្ទុ</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Class Modal Overlay */}
      {isCreateClassModalOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1e293b] text-white rounded-2xl w-full max-w-md p-6 animate-fade-in shadow-2xl border border-slate-700">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2"><span className="text-[#a855f7] text-2xl font-bold font-siemreap">+</span><h3 className="text-xl font-bold font-siemreap text-slate-100">បង្កើតថ្នាក់ថ្មី</h3></div>
              <button onClick={() => {if(createdClasses.length>0)setIsCreateClassModalOpen(false)}} className="text-slate-400 hover:text-red-500 transition-colors"><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateClassSubmit} className="space-y-5 font-siemreap text-left">
              <div>
                <label className="block text-slate-300 mb-2 font-semibold">ឈ្មោះថ្នាក់ <span className="text-red-500">*</span></label>
                <input required type="text" name="className" value={classForm.className} onChange={handleClassFormChange} className="w-full border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 bg-[#0f172a]/40 focus:bg-[#0f172a] text-white transition placeholder-slate-600" placeholder="ឧ. ថ្នាក់ទី៥ក"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-2 font-semibold">កម្រិតថ្នាក់</label>
                  <select name="gradeLevel" value={classForm.gradeLevel} onChange={handleClassFormChange} className="w-full border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 bg-[#0f172a]/40 text-white transition">
                    <option value="ថ្នាក់ទី 7">ថ្នាក់ទី 7</option><option value="ថ្នាក់ទី 8">ថ្នាក់ទី 8</option><option value="ថ្នាក់ទី 9">ថ្នាក់ទី 9</option><option value="ថ្នាក់ទី 10">ថ្នាក់ទី 10</option><option value="ថ្នាក់ទី 11">ថ្នាក់ទី 11</option><option value="ថ្នាក់ទី 12">ថ្នាក់ទី 12</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-2 font-semibold">ឆ្នាំសិក្សា</label>
                  <select name="academicYear" value={classForm.academicYear} onChange={handleClassFormChange} className="w-full border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 bg-[#0f172a]/40 text-white transition">
                    <option value="2025">2025</option><option value="2026">2026</option><option value="2027">2027</option><option value="2028">2028</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-4 pt-4 border-t border-slate-800">
                <button type="submit" className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-md shadow-blue-900/30 text-center">បង្កើត</button>
                <button type="button" onClick={() => {if(createdClasses.length>0)setIsCreateClassModalOpen(false)}} className="flex-1 py-3 rounded-xl bg-[#334155] hover:bg-[#475569] text-slate-200 font-bold transition text-center">បោះបង់</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Schedule Cell Modal Overlay */}
      {isScheduleEditModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className={`rounded-2xl w-full max-w-md p-6 animate-fade-in shadow-xl text-left ${
            isDarkMode ? 'bg-[#1e293b] text-white border border-[#334155]' : 'bg-white text-gray-800'
          }`}>
            <div className={`flex justify-between items-center mb-6 border-b pb-4 ${isDarkMode ? 'border-[#334155]' : 'border-gray-100'}`}>
              <h3 className="text-xl font-moul text-blue-600 flex items-center">
                <Edit className="mr-2" size={20} />
                កែប្រែកាលវិភាគ
              </h3>
              <button onClick={() => setIsScheduleEditModalOpen(false)} className="text-gray-400 hover:text-red-500 transition"><X size={24}/></button>
            </div>
            <form onSubmit={handleSaveScheduleCell} className="space-y-4 font-siemreap">
              <div>
                <label className="block mb-2 font-bold">ឈ្មោះមុខវិជ្ជា / ម៉ោង</label>
                <input 
                  required 
                  type="text" 
                  value={scheduleCellValue} 
                  onChange={(e) => setScheduleCellValue(e.target.value)} 
                  className={`w-full border rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition ${
                    isDarkMode ? 'bg-[#0f172a] border-[#334155] text-white' : 'bg-gray-50 focus:bg-white border-gray-200'
                  }`} 
                  placeholder="ឧ. គណិតវិទ្យា ឬ x"
                />
              </div>
              <div className={`flex justify-end space-x-3 mt-6 pt-5 border-t ${isDarkMode ? 'border-[#334155]' : 'border-gray-100'}`}>
                <button type="button" onClick={() => setIsScheduleEditModalOpen(false)} className={`px-5 py-2 rounded-lg font-bold transition ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-gray-100 text-slate-700 hover:bg-gray-200'}`}>បោះបង់</button>
                <button type="submit" className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-bold transition shadow-sm">រក្សាទុក</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
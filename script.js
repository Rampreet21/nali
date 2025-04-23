        // Global variables
        let currentUser = null;
        let students = [];
        
        // Department subjects by semester
        const departmentSubjects = {
            'Computer Science': {
                '1': ['Mathematics-I', 'Physics', 'Chemistry', 'Basic Electrical Engineering', 'Programming in C', 'Engineering Drawing'],
                '2': ['Mathematics-II', 'Data Structures', 'Digital Electronics', 'Discrete Mathematics', 'Environmental Studies'],
                '3': ['Object Oriented Programming', 'Computer Networks', 'Database Management', 'Operating Systems', 'Theory of Computation'],
                '4': ['Algorithm Design', 'Computer Architecture', 'Software Engineering', 'Web Technologies', 'Artificial Intelligence'],
                '5': ['Machine Learning', 'Cloud Computing', 'Big Data Analytics', 'Cyber Security', 'Mobile Application Development'],
                '6': ['Internet of Things', 'Blockchain Technology', 'Project Work', 'Elective-I', 'Elective-II']
            },
            'Electrical Engineering': {
                '1': ['Mathematics-I', 'Physics', 'Chemistry', 'Basic Electronics', 'Engineering Mechanics'],
                '2': ['Mathematics-II', 'Electrical Circuits', 'Electromagnetic Theory', 'Engineering Drawing', 'Workshop Practice'],
                '3': ['Network Analysis', 'Electronic Devices', 'Digital Electronics', 'Electrical Machines-I', 'Signals & Systems'],
                '4': ['Control Systems', 'Power Systems-I', 'Microprocessors', 'Measurements & Instrumentation', 'Power Electronics'],
                '5': ['Power Systems-II', 'Renewable Energy Systems', 'Industrial Drives', 'High Voltage Engineering', 'Project Management'],
                '6': ['Smart Grid Technologies', 'Electric Vehicle Technology', 'Major Project', 'Elective-I', 'Elective-II']
            },
            'Mechanical Engineering': {
                '1': ['Mathematics-I', 'Physics', 'Chemistry', 'Basic Electronics', 'Engineering Mechanics'],
                '2': ['Mathematics-II', 'Thermodynamics', 'Material Science', 'Electrical Circuits', 'Workshop Practice'],
                '3': ['Strength of Materials', 'Fluid Mechanics', 'Machine Design', 'Control Systems', 'Manufacturing Processes'],
                '4': ['Heat Transfer', 'Dynamics of Machinery', 'Thermal Engineering', 'CAD/CAM', 'Industrial Management'],
                '5': ['Automobile Engineering', 'Robotics', 'Refrigeration & Air Conditioning', 'Quality Control', 'Project Management'],
                '6': ['Advanced Manufacturing', 'Mechatronics', 'Major Project', 'Elective-I', 'Elective-II']
            },
            'Civil Engineering': {
                '1': ['Mathematics-I', 'Physics', 'Chemistry', 'Basic Electronics', 'Engineering Mechanics'],
                '2': ['Mathematics-II', 'Surveying', 'Building Materials', 'Engineering Drawing', 'Workshop Practice'],
                '3': ['Structural Analysis', 'Fluid Mechanics', 'Geotechnical Engineering', 'Concrete Technology', 'Transportation Engineering'],
                '4': ['Design of Structures', 'Hydrology', 'Environmental Engineering', 'Construction Management', 'Estimating & Costing'],
                '5': ['Earthquake Engineering', 'Advanced Construction Techniques', 'Urban Planning', 'Project Management', 'Disaster Management'],
                '6': ['Bridge Engineering', 'Smart City Concepts', 'Major Project', 'Elective-I', 'Elective-II']
            },
            'Pharmacy': {
                '1': ['Pharmaceutical Chemistry-I', 'Human Anatomy & Physiology', 'Pharmaceutics-I', 'Biochemistry', 'Remedial Mathematics/Biology'],
                '2': ['Pharmaceutical Chemistry-II', 'Pharmaceutical Analysis', 'Pharmaceutics-II', 'Pharmacognosy', 'Pathophysiology'],
                '3': ['Pharmacology-I', 'Pharmaceutical Chemistry-III', 'Pharmacognosy-II', 'Pharmaceutical Engineering', 'Pharmaceutical Microbiology'],
                '4': ['Pharmacology-II', 'Pharmaceutical Chemistry-IV', 'Pharmacotherapeutics-I', 'Pharmaceutical Jurisprudence', 'Medicinal Chemistry'],
                '5': ['Pharmacotherapeutics-II', 'Hospital Pharmacy', 'Clinical Pharmacy', 'Biopharmaceutics', 'Pharmaceutical Biotechnology'],
                '6': ['Pharmacy Practice', 'Novel Drug Delivery Systems', 'Major Project', 'Elective-I', 'Elective-II']
            }
        };

         //DOM elements
        const studentForm = document.getElementById('studentForm');
        const saveAllDataBtn = document.getElementById('saveAllData');
       const clearFormBtn = document.getElementById('clearForm');
    const studentsTableBody = document.getElementById('studentsTableBody');
       const practicalTableBody = document.getElementById('practicalTableBody');
      const userAvatar = document.getElementById('userAvatar');
       const profileAvatar = document.getElementById('profileAvatar');
      const profileName = document.getElementById('profileName');
       const profileEmail = document.getElementById('profileEmail');
       const profileDropdown = document.getElementById('profileDropdown');
      const toastContainer = document.getElementById('toastContainer');
       const menuItems = document.querySelectorAll('.menu-item');
       const sectionContents = document.querySelectorAll('.section-content');
       const pageTitle = document.getElementById('pageTitle');
const teacherGreeting = document.getElementById('teacherGreeting');
        const marksTypeTabs = document.querySelectorAll('.marks-type-tab');
        const marksTypeContents = document.querySelectorAll('.marks-type-content');
        const practicalFileInput = document.getElementById('practicalFile');
        const vivaMarksInput = document.getElementById('vivaMarks');
        const performanceMarksInput = document.getElementById('performanceMarks');
        const attendanceMarksInput = document.getElementById('attendanceMarks');
        const totalPracticalMarksInput = document.getElementById('totalPracticalMarks');
        const logoutBtn = document.getElementById('logoutBtn');
    const studentSemesterSelect = document.getElementById('studentSemester');
        const studentSubjectSelect = document.getElementById('studentSubject');
        const studentDepartmentSelect = document.getElementById('studentDepartment');
        const downloadPdfBtn = document.getElementById('downloadPdf');

        function initApp() {
            loadData();
            setupEventListeners();
            updateDashboardStats();
            updateProfileSection();
            
            // Initialize department-subject relationship
            studentDepartmentSelect.addEventListener('change', updateSemesterOptions);
            studentSemesterSelect.addEventListener('change', updateSubjectOptions);
        }

        // Load saved data from localStorage
        function loadData() {
            const savedStudents = localStorage.getItem('studentData');
            if (savedStudents) {
                students = JSON.parse(savedStudents);
                renderStudentsTable();
                renderPracticalTable();
                updateDashboardStats();
            }
        }

        // Update semester options based on selected department
        function updateSemesterOptions() {
            const department = studentDepartmentSelect.value;
            studentSemesterSelect.innerHTML = '<option value="">Select Semester</option>';
            
            if (department) {
                for (let i = 1; i <= 6; i++) {
                    const option = document.createElement('option');
                    option.value = i;
                    option.textContent = `${i}${getOrdinalSuffix(i)} Semester`;
                    studentSemesterSelect.appendChild(option);
                }
            }
            studentSubjectSelect.innerHTML = '<option value="">Select Subject</option>';
        }

        // Helper function to get ordinal suffix
        function getOrdinalSuffix(i) {
            const j = i % 10, k = i % 100;
            if (j === 1 && k !== 11) return 'st';
            if (j === 2 && k !== 12) return 'nd';
            if (j === 3 && k !== 13) return 'rd';
            return 'th';
        }

        // Update subject options based on selected semester and department
        function updateSubjectOptions() {
            const semester = studentSemesterSelect.value;
            const department = studentDepartmentSelect.value;
            studentSubjectSelect.innerHTML = '<option value="">Select Subject</option>';
            
            if (semester && department && departmentSubjects[department] && departmentSubjects[department][semester]) {
                departmentSubjects[department][semester].forEach(subject => {
                    const option = document.createElement('option');
                    option.value = subject;
                    option.textContent = subject;
                    studentSubjectSelect.appendChild(option);
                });
            }
        }

        // Set up event listeners
        function setupEventListeners() {
            // Student form
            studentForm.addEventListener('submit', function(e) {
                e.preventDefault();
                addStudent();
            });

            // Buttons
            saveAllDataBtn.addEventListener('click', saveAllStudentData);
            clearFormBtn.addEventListener('click', clearStudentForm);
            logoutBtn.addEventListener('click', logout);

            // Profile dropdown
            userAvatar.addEventListener('click', toggleProfileDropdown);

            // Navigation menu
            menuItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    navigateToSection(item.dataset.section);
                });
            });

            // Marks type tabs
            marksTypeTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const tabId = tab.dataset.tab;
                    switchMarksTab(tabId);
                });
            });

            // Practical marks calculation
            [practicalFileInput, vivaMarksInput, performanceMarksInput, attendanceMarksInput].forEach(input => {
                input.addEventListener('input', calculatePracticalTotal);
            });
            
            // PDF download
            downloadPdfBtn.addEventListener('click', generatePdfReport);
        }

        // Switch between theory and practical marks tabs
        function switchMarksTab(tabId) {
            marksTypeTabs.forEach(tab => {
                tab.classList.toggle('active', tab.dataset.tab === tabId);
            });

            marksTypeContents.forEach(content => {
                content.classList.toggle('active', content.id === tabId);
            });
        }

        // Calculate practical total marks
        function calculatePracticalTotal() {
            const practicalFile = parseFloat(practicalFileInput.value) || 0;
            const viva = parseFloat(vivaMarksInput.value) || 0;
            const performance = parseFloat(performanceMarksInput.value) || 0;
            const attendance = parseFloat(attendanceMarksInput.value) || 0;
            
            const total = practicalFile + viva + performance + attendance;
            totalPracticalMarksInput.value = total > 0 ? total : '';
        }

        // Update profile section
        function updateProfileSection() {
            const initials = "JD";
            userAvatar.textContent = initials;
            profileAvatar.textContent = initials;
            profileName.textContent = "John Doe";
            profileEmail.textContent = "john.doe@example.com";
            teacherGreeting.textContent = "Teacher";
        }

        // Add new student
        function addStudent() {
            // Validate required fields
            const rollNo = document.getElementById('studentRollNo').value.trim();
            const name = document.getElementById('studentName').value.trim();
            const semester = document.getElementById('studentSemester').value;
            const department = document.getElementById('studentDepartment').value;
            const subject = document.getElementById('studentSubject').value;
        
            if (!rollNo || !name || !semester || !department || !subject) {
                showToast('Please fill all required fields', 'error');
                return;
            }
        
            // Collect marks
            const marks = {
                rollNo,
                name,
                semester,
                department,
                subject,
                houseTest1: document.getElementById('houseTest1').value || '0',
                houseTest2: document.getElementById('houseTest2').value || '0',
                houseTest3: document.getElementById('houseTest3').value || '0',
                assignmentMarks: document.getElementById('assignmentMarks').value || '0',
                seminarMarks: document.getElementById('seminarMarks').value || '0',
                practicalFile: document.getElementById('practicalFile').value || '0',
                vivaMarks: document.getElementById('vivaMarks').value || '0',
                performanceMarks: document.getElementById('performanceMarks').value || '0',
                attendanceMarks: document.getElementById('attendanceMarks').value || '0',
                totalPracticalMarks: document.getElementById('totalPracticalMarks').value || '0',
                addedDate: new Date().toISOString()
            };
        
            // Check if at least one mark is provided
            const hasTheoryMarks = marks.houseTest1 !== '0' || marks.houseTest2 !== '0' || marks.houseTest3 !== '0' || 
                                  marks.assignmentMarks !== '0' || marks.seminarMarks !== '0';
            const hasPracticalMarks = marks.practicalFile !== '0' || marks.vivaMarks !== '0' || 
                                     marks.performanceMarks !== '0' || marks.attendanceMarks !== '0';
            
            if (!hasTheoryMarks && !hasPracticalMarks) {
                showToast('Please add at least one mark (theory or practical)', 'error');
                return;
            }
        
            students.push(marks);
            renderStudentsTable();
            renderPracticalTable();
            clearStudentForm();
            updateDashboardStats();
            saveAllStudentData();
            
            showToast('Student record added successfully!', 'success');
        }

        // Render students table (theory marks)
        function renderStudentsTable() {
            studentsTableBody.innerHTML = '';
        
            if (students.length === 0) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td colspan="11" style="text-align: center;">
                        No student records found. Add some students to get started.
                    </td>
                `;
                studentsTableBody.appendChild(row);
                return;
            }
        
            students.forEach((student, index) => {
                // Skip if student has no theory marks
                if (student.houseTest1 === '0' && student.houseTest2 === '0' && student.houseTest3 === '0' && 
                    student.assignmentMarks === '0' && student.seminarMarks === '0') {
                    return;
                }
                
                const row = document.createElement('tr');
        
                // Helper function to create mark cell
                const createMarkCell = (mark) => {
                    const cell = document.createElement('td');
                    const numMark = parseInt(mark);
                    cell.textContent = numMark > 0 ? numMark : '-';
                    return cell;
                };
                
                // Calculate total theory marks
                const totalMarks = [
                    parseInt(student.houseTest1),
                    parseInt(student.houseTest2),
                    parseInt(student.houseTest3),
                    parseInt(student.assignmentMarks),
                    parseInt(student.seminarMarks)
                ].reduce((sum, mark) => sum + mark, 0);
                
                // Create cells
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${student.rollNo}</td>
                    <td>${student.name}</td>
                    <td>${student.subject}</td>
                    <td>${student.houseTest1 !== '0' ? student.houseTest1 : '-'}</td>
                    <td>${student.houseTest2 !== '0' ? student.houseTest2 : '-'}</td>
                    <td>${student.houseTest3 !== '0' ? student.houseTest3 : '-'}</td>
                    <td>${student.assignmentMarks !== '0' ? student.assignmentMarks : '-'}</td>
                    <td>${student.seminarMarks !== '0' ? student.seminarMarks : '-'}</td>
                    <td>${totalMarks}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="editStudent(${index})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </td>
                `;
        
                studentsTableBody.appendChild(row);
            });
        }

        // Render practical marks table
        function renderPracticalTable() {
            practicalTableBody.innerHTML = '';
        
            if (students.length === 0) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td colspan="10" style="text-align: center;">
                        No practical marks records found. Add some students to get started.
                    </td>
                `;
                practicalTableBody.appendChild(row);
                return;
            }
        
            students.forEach((student, index) => {
                // Skip if student has no practical marks
                if (student.practicalFile === '0' && student.vivaMarks === '0' && 
                    student.performanceMarks === '0' && student.attendanceMarks === '0') {
                    return;
                }
                
                const row = document.createElement('tr');
                
                // Calculate total practical marks
                const totalPracticalMarks = [
                    parseInt(student.practicalFile),
                    parseInt(student.vivaMarks),
                    parseInt(student.performanceMarks),
                    parseInt(student.attendanceMarks)
                ].reduce((sum, mark) => sum + mark, 0);
                
                // Create cells
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${student.rollNo}</td>
                    <td>${student.name}</td>
                    <td>${student.subject}</td>
                    <td>${student.practicalFile !== '0' ? student.practicalFile : '-'}</td>
                    <td>${student.vivaMarks !== '0' ? student.vivaMarks : '-'}</td>
                    <td>${student.performanceMarks !== '0' ? student.performanceMarks : '-'}</td>
                    <td>${student.attendanceMarks !== '0' ? student.attendanceMarks : '-'}</td>
                    <td>${totalPracticalMarks}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="editStudent(${index})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </td>
                `;
        
                practicalTableBody.appendChild(row);
            });
        }

        // Edit student
        function editStudent(index) {
            const student = students[index];
        
            // Fill the form with student data
            document.getElementById('studentRollNo').value = student.rollNo;
            document.getElementById('studentName').value = student.name;
            document.getElementById('studentSemester').value = student.semester;
            document.getElementById('studentDepartment').value = student.department;
            
            // Update subjects based on department and semester
            updateSubjectOptions();
            setTimeout(() => {
                document.getElementById('studentSubject').value = student.subject;
            }, 100);
        
            // Fill theory marks
            document.getElementById('houseTest1').value = student.houseTest1 !== '0' ? student.houseTest1 : '';
            document.getElementById('houseTest2').value = student.houseTest2 !== '0' ? student.houseTest2 : '';
            document.getElementById('houseTest3').value = student.houseTest3 !== '0' ? student.houseTest3 : '';
            document.getElementById('assignmentMarks').value = student.assignmentMarks !== '0' ? student.assignmentMarks : '';
            document.getElementById('seminarMarks').value = student.seminarMarks !== '0' ? student.seminarMarks : '';
        
            // Fill practical marks
            document.getElementById('practicalFile').value = student.practicalFile !== '0' ? student.practicalFile : '';
            document.getElementById('vivaMarks').value = student.vivaMarks !== '0' ? student.vivaMarks : '';
            document.getElementById('performanceMarks').value = student.performanceMarks !== '0' ? student.performanceMarks : '';
            document.getElementById('attendanceMarks').value = student.attendanceMarks !== '0' ? student.attendanceMarks : '';
            calculatePracticalTotal();
        
            // Remove the student from the array
            students.splice(index, 1);
        
            showToast('Student record loaded for editing', 'success');
        }

        // Delete student
        function deleteStudent(index) {
            if (confirm('Are you sure you want to delete this student record?')) {
                students.splice(index, 1);
                renderStudentsTable();
                renderPracticalTable();
                updateDashboardStats();
                saveAllStudentData();
                showToast('Student record deleted successfully!', 'success');
            }
        }

        // Clear student form
        function clearStudentForm() {
            document.getElementById('studentRollNo').value = '';
            document.getElementById('studentName').value = '';
            document.getElementById('studentSemester').value = '';
            document.getElementById('studentDepartment').value = '';
            document.getElementById('studentSubject').value = '';
            document.getElementById('houseTest1').value = '';
            document.getElementById('houseTest2').value = '';
            document.getElementById('houseTest3').value = '';
            document.getElementById('assignmentMarks').value = '';
            document.getElementById('seminarMarks').value = '';
            document.getElementById('practicalFile').value = '';
            document.getElementById('vivaMarks').value = '';
            document.getElementById('performanceMarks').value = '';
            document.getElementById('attendanceMarks').value = '';
            document.getElementById('totalPracticalMarks').value = '';
        }

        // Save all student data
        function saveAllStudentData() {
            localStorage.setItem('studentData', JSON.stringify(students));
        }

        // Toggle profile dropdown
        function toggleProfileDropdown(e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
            if (profileDropdown.classList.contains('active')) {
                document.addEventListener('click', closeProfileDropdown);
            } else {
                document.removeEventListener('click', closeProfileDropdown);
            }
        }

        // Close profile dropdown
        function closeProfileDropdown() {
            profileDropdown.classList.remove('active');
            document.removeEventListener('click', closeProfileDropdown);
        }

        // Show toast notification
        function showToast(message, type = 'success') {
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.innerHTML = `
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                ${message}
            `;
            toastContainer.appendChild(toast);

            setTimeout(() => {
                toast.classList.add('fade-out');
                setTimeout(() => toast.remove(), 300);
            }, 5000);
        }

        // Navigate to section
        function navigateToSection(section) {
            sectionContents.forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${section}Section`).classList.add('active');

            menuItems.forEach(item => {
                item.classList.toggle('active', item.dataset.section === section);
            });

            pageTitle.textContent = section === 'dashboard' ? 'Dashboard' : 'Student Management';
        }

        // Logout
        function logout() {
            if (confirm('Are you sure you want to logout?')) {
                showToast('You have been logged out successfully', 'success');
                updateProfileSection();
            }
        }

        // Update dashboard stats
        function updateDashboardStats() {
            document.getElementById('totalStudents').textContent = students.length;
        
            if (students.length > 0) {
                let totalMarks = 0;
                let count = 0;
        
                students.forEach(student => {
                    if (student.houseTest1 !== '0') {
                        totalMarks += parseInt(student.houseTest1);
                        count++;
                    }
                    if (student.houseTest2 !== '0') {
                        totalMarks += parseInt(student.houseTest2);
                        count++;
                    }
                    if (student.houseTest3 !== '0') {
                        totalMarks += parseInt(student.houseTest3);
                        count++;
                    }
                    if (student.assignmentMarks) {
                        totalMarks += parseInt(student.assignmentMarks);
                        count++;
                    }
                    if (student.seminarMarks) {
                        totalMarks += parseInt(student.seminarMarks);
                        count++;
                    }
                });
        
                const avgMarks = count > 0 ? (totalMarks / count) : 0;
                document.getElementById('avgMarks').textContent = avgMarks.toFixed(1) + '%';
            }
        }
   


// Add event listener for the PDF button in setupEventListeners()
document.getElementById('downloadPdf').addEventListener('click', generatePdfReport);


// Inside your existing setupEventListeners() function, add:
document.getElementById('downloadPdf').addEventListener('click', generatePdfReport);






    // Generate PDF report
    function generatePdfReport() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Add title
        doc.setFontSize(18);
        doc.setTextColor(40);
        doc.text('Sessional Marks Report', 105, 15, { align: 'center' });
        
        // Get department and semester (from form or first student)
        let department = document.getElementById('studentDepartment').value;
        let semester = document.getElementById('studentSemester').value;
        
        // If not selected in form, try to get from first student
        if (!department && students.length > 0) {
            department = students[0].department;
        }
        if (!semester && students.length > 0) {
            semester = students[0].semester;
        }
        
        // Add department/semester info if available
        doc.setFontSize(12);
        if (department) {
            doc.text(`Department: ${department}`, 105, 22, { align: 'center' });
        }
        if (semester) {
            doc.text(`Semester: ${semester}${getOrdinalSuffix(semester)} Semester`, 105, 28, { align: 'center' });
        }
        
        // Add date
        doc.setFontSize(10);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 34, { align: 'center' });
        
        // Prepare data for the table
        const reportData = students.map((student, index) => {
            // Calculate total theory marks
            const theoryTotal = [
                student.houseTest1,
                student.houseTest2,
                student.houseTest3,
                student.assignmentMarks,
                student.seminarMarks
            ].reduce((sum, mark) => sum + (parseInt(mark) || 0), 0);
            
            // Calculate total practical marks
            const practicalTotal = [
                student.practicalFile,
                student.vivaMarks,
                student.performanceMarks,
                student.attendanceMarks
            ].reduce((sum, mark) => sum + (parseInt(mark) || 0), 0);
            
            return [
                index + 1,
                student.rollNo,
                student.name,
                student.subject,
                theoryTotal,
                practicalTotal,
                theoryTotal + practicalTotal
            ];
        });
        
        // Add table
        doc.autoTable({
            head: [['S.No', 'Roll No', 'Name', 'Subject', 'Theory', 'Practical', 'Total']],
            body: reportData,
            startY: 40,
            styles: {
                fontSize: 9,
                cellPadding: 2,
                valign: 'middle'
            },
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: 255,
                fontStyle: 'bold'
            },
            alternateRowStyles: {
                fillColor: [245, 245, 245]
            },
            columnStyles: {
                0: { cellWidth: 10 }, // S.No
                1: { cellWidth: 20 }, // Roll No
                2: { cellWidth: 35 }, // Name
                3: { cellWidth: 40 }, // Subject
                4: { cellWidth: 20 }, // Theory
                5: { cellWidth: 20 }, // Practical
                6: { cellWidth: 20 }  // Total
            },
            didDrawPage: function (data) {
                // Footer
                doc.setFontSize(10);
                doc.setTextColor(150);
                doc.text('Sessional Marks Management System', data.settings.margin.left, doc.internal.pageSize.height - 10);
            }
        });
        
        // Save the PDF
        doc.save(`Sessional_Marks_Report_${new Date().toISOString().slice(0,10)}.pdf`);
    }
    
    // Helper function to get ordinal suffix
    function getOrdinalSuffix(i) {
        i = parseInt(i);
        const j = i % 10, k = i % 100;
        if (j === 1 && k !== 11) return 'st';
        if (j === 2 && k !== 12) return 'nd';
        if (j === 3 && k !== 13) return 'rd';
        return 'th';
    }






        // Initialize the app when DOM is loaded
        document.addEventListener('DOMContentLoaded', initApp);

        // Make functions available globally for inline event handlers
        window.editStudent = editStudent;
        window.deleteStudent = deleteStudent;
        window.navigateToSection = navigateToSection;

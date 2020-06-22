var gradeTotal = 0;
var grades = [
	{ grade: 'U', proportion: 1.7 },
	{ grade: '1', proportion: 4.5 },
	{ grade: '2', proportion: 9.5 },
	{ grade: '3', proportion: 17.3 },
	{ grade: '4', proportion: 16.4 },
	{ grade: '5', proportion: 16.6 },
	{ grade: '6', proportion: 13.4 },
	{ grade: '7', proportion: 9.4 },
	{ grade: '8', proportion: 6.7 },
	{ grade: '9', proportion: 4.5 }
];
const subjects = [
	{ id: 'maths', name: 'Maths' },
	{ id: 'ad-maths', name: 'Additional Maths' },
	{ id: 'stats', name: 'Statistics' },
	{ id: 'eng-lang', name: 'English Language' },
	{ id: 'eng-lit', name: 'English Literature' },
	{ id: 'science', name: 'Science' },
	{ id: 'biology', name: 'Biology' },
	{ id: 'chemistry', name: 'Chemistry' },
	{ id: 'physics', name: 'Physics' },
	{ id: 'health', name: 'Health & Social Care' },
	{ id: 'spanish', name: 'Spanish' },
	{ id: 'french', name: 'French' },
	{ id: 'german', name: 'German' },
	{ id: 'latin', name: 'Latin' },
	{ id: 'computing', name: 'Computing' },
	{ id: 'dt', name: 'Design & Technology' },
	{ id: 'art', name: 'Art & Design' },
	{ id: 'food', name: 'Food Preparation & Nutrition' },
	{ id: 'history', name: 'History' },
	{ id: 'geography', name: 'Geography' },
	{ id: 'rs', name: 'Religious Studies' },
	{ id: 'humanities', name: 'Humanities' },
	{ id: 'business', name: 'Business Studies' },
	{ id: 'economics', name: 'Economics' },
	{ id: 'drama', name: 'Drama' },
	{ id: 'media', name: 'Media / Film / TV Studies' },
	{ id: 'music', name: 'Music' },
	{ id: 'pe', name: 'Physical Education' },
]
var canSpin = false;
var spinTimeout = null;
var predictedGrades = {};

//Fetch old info from localstorage
let oldGrades = localStorage.getItem('predictedGrades');
try {
	if (!oldGrades) throw null;
	oldGrades = atob(oldGrades);
	oldGrades = JSON.parse(oldGrades);
	predictedGrades = oldGrades;
}
catch(error) {
	predictedGrades = JSON.parse(atob('eyJQaHlzaWNzIjp7InRvdGFsIjoyMDguMjUsImlkIjoicGh5c2ljcyIsImdyYWRlcyI6W3siZ3JhZGUiOiJVIiwidG90YWwiOjAuODV9LHsiZ3JhZGUiOiIxIiwidG90YWwiOjUuMzV9LHsiZ3JhZGUiOiIyIiwidG90YWwiOjI0LjM1fSx7ImdyYWRlIjoiMyIsInRvdGFsIjo3Ni4yNX0seyJncmFkZSI6IjQiLCJ0b3RhbCI6MTQxLjg1fSx7ImdyYWRlIjoiNSIsInRvdGFsIjoyMDguMjV9XSwiZ3JhZGUiOiI1In0sIk1hdGhzIjp7InRvdGFsIjoyMDguMjUsImlkIjoibWF0aHMiLCJncmFkZXMiOlt7ImdyYWRlIjoiVSIsInRvdGFsIjowLjg1fSx7ImdyYWRlIjoiMSIsInRvdGFsIjo1LjM1fSx7ImdyYWRlIjoiMiIsInRvdGFsIjoyNC4zNX0seyJncmFkZSI6IjMiLCJ0b3RhbCI6NzYuMjV9LHsiZ3JhZGUiOiI0IiwidG90YWwiOjE0MS44NX0seyJncmFkZSI6IjUiLCJ0b3RhbCI6MjA4LjI1fV0sImdyYWRlIjoiNSJ9LCJFbmdsaXNoIExhbmd1YWdlIjp7InRvdGFsIjoyMDguMjUsImlkIjoiZW5nLWxhbmciLCJncmFkZXMiOlt7ImdyYWRlIjoiVSIsInRvdGFsIjowLjg1fSx7ImdyYWRlIjoiMSIsInRvdGFsIjo1LjM1fSx7ImdyYWRlIjoiMiIsInRvdGFsIjoyNC4zNX0seyJncmFkZSI6IjMiLCJ0b3RhbCI6NzYuMjV9LHsiZ3JhZGUiOiI0IiwidG90YWwiOjE0MS44NX0seyJncmFkZSI6IjUiLCJ0b3RhbCI6MjA4LjI1fV0sImdyYWRlIjoiNSJ9LCJFbmdsaXNoIExpdGVyYXR1cmUiOnsidG90YWwiOjIwOC4yNSwiaWQiOiJlbmctbGl0IiwiZ3JhZGVzIjpbeyJncmFkZSI6IlUiLCJ0b3RhbCI6MC44NX0seyJncmFkZSI6IjEiLCJ0b3RhbCI6NS4zNX0seyJncmFkZSI6IjIiLCJ0b3RhbCI6MjQuMzV9LHsiZ3JhZGUiOiIzIiwidG90YWwiOjc2LjI1fSx7ImdyYWRlIjoiNCIsInRvdGFsIjoxNDEuODV9LHsiZ3JhZGUiOiI1IiwidG90YWwiOjIwOC4yNX1dLCJncmFkZSI6IjUifSwiQmlvbG9neSI6eyJ0b3RhbCI6MjA4LjI1LCJpZCI6ImJpb2xvZ3kiLCJncmFkZXMiOlt7ImdyYWRlIjoiVSIsInRvdGFsIjowLjg1fSx7ImdyYWRlIjoiMSIsInRvdGFsIjo1LjM1fSx7ImdyYWRlIjoiMiIsInRvdGFsIjoyNC4zNX0seyJncmFkZSI6IjMiLCJ0b3RhbCI6NzYuMjV9LHsiZ3JhZGUiOiI0IiwidG90YWwiOjE0MS44NX0seyJncmFkZSI6IjUiLCJ0b3RhbCI6MjA4LjI1fV0sImdyYWRlIjoiNSJ9LCJDaGVtaXN0cnkiOnsidG90YWwiOjIwOC4yNSwiaWQiOiJjaGVtaXN0cnkiLCJncmFkZXMiOlt7ImdyYWRlIjoiVSIsInRvdGFsIjowLjg1fSx7ImdyYWRlIjoiMSIsInRvdGFsIjo1LjM1fSx7ImdyYWRlIjoiMiIsInRvdGFsIjoyNC4zNX0seyJncmFkZSI6IjMiLCJ0b3RhbCI6NzYuMjV9LHsiZ3JhZGUiOiI0IiwidG90YWwiOjE0MS44NX0seyJncmFkZSI6IjUiLCJ0b3RhbCI6MjA4LjI1fV0sImdyYWRlIjoiNSJ9fQ=='));
}
updateSlots();

// Add Predicted Grades
for (let subject of subjects) {
	$('#predicted-grades').append(`
	<div class="subject ${!predictedGrades[subject.name] && 'subject-disabled'}" id="${subject.id}">
		<img src="/icons/${subject.id}.png" alt="Icon of ${subject.name}">
		<h3>${subject.name}</h3>
		<div class="predicted-grade-controls">
			<div id="${subject.id}-down" class="arrow-div"><i class="arrow arrow-left"></i></div>
			<p id="${subject.id}-grade">${predictedGrades[subject.name] ? predictedGrades[subject.name].grade : ''}</p>
			<div id="${subject.id}-up" class="arrow-div"><i class="arrow arrow-right"></i></div>
		</div>
	</div>`);

	function changeValue(value) {
		if (value) {
			for (let grade of grades) {
				gradeTotal += grade.proportion
				grade.total = gradeTotal;
			}
			predictedGrades[subject.name] = { total: 0, id: subject.id, grades: [], grade: value };

			let gradeIndex = grades.findIndex(grade => grade.grade == value);
			if (gradeIndex === -1) return;

			for (let i = 0; i < grades.length && i < gradeIndex + 1; i++) {
				let total = grades[i].proportion;

				if (i === gradeIndex) total = total * 5;
				else if (i+1 === gradeIndex) total = total * 4;
				else if (i+2 === gradeIndex) total = total * 3;
				else if (i+3 === gradeIndex) total = total * 2;
				else if (i+4 === gradeIndex) total = total * 1;
				else total = total * 0.5;

				predictedGrades[subject.name].total += total;
				predictedGrades[subject.name].grades.push({
					grade: grades[i].grade,
					total: predictedGrades[subject.name].total
				});
			}
			$('#'+subject.id).removeClass('subject-disabled');
		}
		else {
			delete predictedGrades[subject.name];
			$('#'+subject.id).addClass('subject-disabled');
		};
		$(`#${subject.id}-grade`).text(value);
		localStorage.setItem('predictedGrades', btoa(JSON.stringify(predictedGrades)));
		updateSlots();
	}

	$(`#${subject.id}-down`).on('click', () => {
		if (predictedGrades[subject.name]) {
			let gradeIndex = grades.findIndex(grade => grade.grade == predictedGrades[subject.name].grade) - 1;
			if (gradeIndex < 0) changeValue('');
			else changeValue(grades[gradeIndex].grade);
		}
		else changeValue(grades[grades.length-1].grade);
		
	});
	$(`#${subject.id}-up`).on('click', () => {
		if (predictedGrades[subject.name]) {
			let gradeIndex = grades.findIndex(grade => grade.grade == predictedGrades[subject.name].grade) + 1;
			if (gradeIndex > grades.length-1) changeValue('');
			else changeValue(grades[gradeIndex].grade);
		}
		else changeValue(grades[0].grade);
	});
}

var longestDuration = 0;
function updateSlots(full = false) {
	if (spinTimeout) {
		clearTimeout(spinTimeout);
		document.getElementById('audio-spin').pause();
		document.getElementById('audio-success').pause();
		spinTimeout = null;
	}
	$('#slots').empty();
	if (Object.keys(predictedGrades).length > 0) {
		canSpin = true;
		$('#slots').css('display', 'flex');
		$('#spin-button').text('Get My Grades!');
		$('#spin-button').css('cursor', 'pointer');
	}
	else {
		canSpin = false;
		$('#slots').css('display', 'none');
		$('#spin-button').text('v Select Your Predicted Grades v');
		$('#spin-button').css('cursor', 'not-allowed');
	}

	for (let [subjectName, predictedGrade] of Object.entries(predictedGrades)) {
		let slot = $('<div class="slot"></div>');
		slot.append(`<div class="slot-title"><img src="/icons/${predictedGrade.id}.png" alt="Icon of ${subjectName}"></div>`);

		let slotGradesWrapper = $(`<div class="slot-grades-wrapper"></div>`);

		if (full) {
			let duration = Math.random()*4+4;
			if (duration > longestDuration) longestDuration = duration;
			var slotGrades = $(`<div class="slot-grades" style="animation-duration: ${duration}s;"></div>`);
		}
		else {
			var slotGrades = $(`<div class="slot-grades"></div>`);
		}
		
		if (full) {
			for (let z = 0; z < 41; z++) {
				let grade = '';
				let randomNumber = Math.floor(Math.random()*predictedGrade.total);
				for (_grade of predictedGrade.grades) {
					if (randomNumber <= _grade.total) {
						grade = _grade.grade;
						break;
					}
				}
	
				if (z === 39) slotGrades.append(`<div class="slot-grade slot-grade-actual">${grade}</div>`);
				else slotGrades.append(`<div class="slot-grade slot-grade-fill">${grade}</div>`);
			}
		}
		else {
			for (let z = 0; z < 3; z++) {
				if (z === 1) slotGrades.append(`<div class="slot-grade">${predictedGrade.grade}</div>`);
				else slotGrades.append(`<div class="slot-grade slot-grade-fill">?</div>`);
			}
		}
		
	
		slotGradesWrapper.append(slotGrades);
		slot.append(slotGradesWrapper);
		$('#slots').append(slot)
	}
	$('#slots').append('<div class="slot-target"></div>');
}

function spin() {
	if (!canSpin) return;
	updateSlots(true);
	document.getElementById('audio-spin').currentTime = 0;
	document.getElementById('audio-spin').play();
	canSpin = false;
	$('#spin-button').text('Calculating...');
	$('#spin-button').css('cursor', 'not-allowed');
	$('.slot-grades').css('animation-name', 'spin');

	spinTimeout = setTimeout(() => {
		$('.slot-grades').css('duration', 0);
		$('.slot-grade-actual').addClass('grown-slot-grade');
		$('.slot-grade-fill').addClass('hidden-slot-grade');
		document.getElementById('audio-spin').pause();
		document.getElementById('audio-success').currentTime = 0;
		document.getElementById('audio-success').play();

		spinTimeout = setTimeout(() => {
			$('#spin-button').text('Respin!');
			$('#spin-button').css('cursor', 'pointer');
			canSpin = true;
			spinTimout = null;
		}, 2000);
	}, longestDuration*1000);
}

$('#spin-button').on('click', spin);
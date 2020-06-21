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
	{ id: 'health', name: 'Health & Social Care' },
	{ id: 'physics', name: 'Physics' },
	{ id: 'spanish', name: 'Spanish' },
	{ id: 'french', name: 'French' },
	{ id: 'german', name: 'German' },
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
	{ id: 'drama', name: 'Performing / Expressive Arts (Drama)' },
	{ id: 'media', name: 'Media / Film / TV Studies' },
	{ id: 'music', name: 'Music' }
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
	predictedGrades = JSON.parse(atob('eyJNYXRocyI6eyJ0b3RhbCI6MjE2LjQsImdyYWRlcyI6W3siZ3JhZGUiOiJVIiwidG90YWwiOjAuODV9LHsiZ3JhZGUiOiIxIiwidG90YWwiOjMuMX0seyJncmFkZSI6IjIiLCJ0b3RhbCI6MTIuNn0seyJncmFkZSI6IjMiLCJ0b3RhbCI6NDcuMn0seyJncmFkZSI6IjQiLCJ0b3RhbCI6OTYuNH0seyJncmFkZSI6IjUiLCJ0b3RhbCI6MTYyLjh9LHsiZ3JhZGUiOiI2IiwidG90YWwiOjIxNi40fV0sImdyYWRlIjoiNiJ9LCJFbmdsaXNoIExhbmd1YWdlIjp7InRvdGFsIjoyMTYuNCwiZ3JhZGVzIjpbeyJncmFkZSI6IlUiLCJ0b3RhbCI6MC44NX0seyJncmFkZSI6IjEiLCJ0b3RhbCI6My4xfSx7ImdyYWRlIjoiMiIsInRvdGFsIjoxMi42fSx7ImdyYWRlIjoiMyIsInRvdGFsIjo0Ny4yfSx7ImdyYWRlIjoiNCIsInRvdGFsIjo5Ni40fSx7ImdyYWRlIjoiNSIsInRvdGFsIjoxNjIuOH0seyJncmFkZSI6IjYiLCJ0b3RhbCI6MjE2LjR9XSwiZ3JhZGUiOiI2In0sIkVuZ2xpc2ggTGl0ZXJhdHVyZSI6eyJ0b3RhbCI6MjE2LjQsImdyYWRlcyI6W3siZ3JhZGUiOiJVIiwidG90YWwiOjAuODV9LHsiZ3JhZGUiOiIxIiwidG90YWwiOjMuMX0seyJncmFkZSI6IjIiLCJ0b3RhbCI6MTIuNn0seyJncmFkZSI6IjMiLCJ0b3RhbCI6NDcuMn0seyJncmFkZSI6IjQiLCJ0b3RhbCI6OTYuNH0seyJncmFkZSI6IjUiLCJ0b3RhbCI6MTYyLjh9LHsiZ3JhZGUiOiI2IiwidG90YWwiOjIxNi40fV0sImdyYWRlIjoiNiJ9LCJCaW9sb2d5Ijp7InRvdGFsIjoyMTYuNCwiZ3JhZGVzIjpbeyJncmFkZSI6IlUiLCJ0b3RhbCI6MC44NX0seyJncmFkZSI6IjEiLCJ0b3RhbCI6My4xfSx7ImdyYWRlIjoiMiIsInRvdGFsIjoxMi42fSx7ImdyYWRlIjoiMyIsInRvdGFsIjo0Ny4yfSx7ImdyYWRlIjoiNCIsInRvdGFsIjo5Ni40fSx7ImdyYWRlIjoiNSIsInRvdGFsIjoxNjIuOH0seyJncmFkZSI6IjYiLCJ0b3RhbCI6MjE2LjR9XSwiZ3JhZGUiOiI2In0sIkNoZW1pc3RyeSI6eyJ0b3RhbCI6MjE2LjQsImdyYWRlcyI6W3siZ3JhZGUiOiJVIiwidG90YWwiOjAuODV9LHsiZ3JhZGUiOiIxIiwidG90YWwiOjMuMX0seyJncmFkZSI6IjIiLCJ0b3RhbCI6MTIuNn0seyJncmFkZSI6IjMiLCJ0b3RhbCI6NDcuMn0seyJncmFkZSI6IjQiLCJ0b3RhbCI6OTYuNH0seyJncmFkZSI6IjUiLCJ0b3RhbCI6MTYyLjh9LHsiZ3JhZGUiOiI2IiwidG90YWwiOjIxNi40fV0sImdyYWRlIjoiNiJ9LCJQaHlzaWNzIjp7InRvdGFsIjoyMTYuNCwiZ3JhZGVzIjpbeyJncmFkZSI6IlUiLCJ0b3RhbCI6MC44NX0seyJncmFkZSI6IjEiLCJ0b3RhbCI6My4xfSx7ImdyYWRlIjoiMiIsInRvdGFsIjoxMi42fSx7ImdyYWRlIjoiMyIsInRvdGFsIjo0Ny4yfSx7ImdyYWRlIjoiNCIsInRvdGFsIjo5Ni40fSx7ImdyYWRlIjoiNSIsInRvdGFsIjoxNjIuOH0seyJncmFkZSI6IjYiLCJ0b3RhbCI6MjE2LjR9XSwiZ3JhZGUiOiI2In19'));
}
updateSlots();

// Add Predicted Grades
for (let subject of subjects) {
	$('#predicted-grades').append(`
	<div class="subject">
		<h3>${subject.name}</h3>
		<form onsubmit="return false">
			<select name="grade" id="${subject.id}">
				<option></option>
				<option ${predictedGrades[subject.name] && predictedGrades[subject.name].grade === 'U' && 'selected'}>U</option>
				<option ${predictedGrades[subject.name] && predictedGrades[subject.name].grade === '1' && 'selected'}>1</option>
				<option ${predictedGrades[subject.name] && predictedGrades[subject.name].grade === '2' && 'selected'}>2</option>
				<option ${predictedGrades[subject.name] && predictedGrades[subject.name].grade === '3' && 'selected'}>3</option>
				<option ${predictedGrades[subject.name] && predictedGrades[subject.name].grade === '4' && 'selected'}>4</option>
				<option ${predictedGrades[subject.name] && predictedGrades[subject.name].grade === '5' && 'selected'}>5</option>
				<option ${predictedGrades[subject.name] && predictedGrades[subject.name].grade === '6' && 'selected'}>6</option>
				<option ${predictedGrades[subject.name] && predictedGrades[subject.name].grade === '7' && 'selected'}>7</option>
				<option ${predictedGrades[subject.name] && predictedGrades[subject.name].grade === '8' && 'selected'}>8</option>
				<option ${predictedGrades[subject.name] && predictedGrades[subject.name].grade === '9' && 'selected'}>9</option>
			</select>
		</form>
	</div>`);

	$('#'+subject.id).on('change', (event) => {
		if (event.target.value) {
			for (let grade of grades) {
				gradeTotal += grade.proportion
				grade.total = gradeTotal;
			}
			predictedGrades[subject.name] = { total: 0, grades: [], grade: event.target.value };

			let gradeIndex = grades.findIndex(grade => grade.grade == event.target.value);
			if (gradeIndex === -1) return;

			for (let i = 0; i < grades.length && i < gradeIndex + 1; i++) {
				let total = grades[i].proportion;

				if (i === gradeIndex) total = total * 4;
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
		}
		else delete predictedGrades[subject.name];
		localStorage.setItem('predictedGrades', btoa(JSON.stringify(predictedGrades)));
		updateSlots();
	});
}

var longestDuration = 0;
function updateSlots(full = false) {
	if (spinTimeout) {
		clearTimeout(spinTimeout);
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
		slot.append(`<div class="slot-title">${subjectName}</div>`);

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
	canSpin = false;

	updateSlots(true);

	$('.slot-grades').css('animation-name', 'spin');

	spinTimeout = setTimeout(() => {
		$('.slot-grades').css('duration', 0);
		$('.slot-grade-actual').addClass('grown-slot-grade');
		$('.slot-grade-fill').addClass('hidden-slot-grade');

		spinTimeout = setTimeout(() => {
			$('#spin-button').text('Respin!');
			$('#spin-button').css('cursor', 'pointer');
			canSpin = true;
			spinTimout = null;
		}, 2000);
	}, longestDuration*1000);
}

$('#spin-button').on('click', spin);
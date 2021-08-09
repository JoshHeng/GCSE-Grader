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
var results = [];

//Resizing to vertical slot machine if too small
var horizontal = true;
var slotMachineWidth = 1000;
var slotsCount = 1;

function resize(onlyUpdate = false) {
	if (!predictedGrades) return;
	if (onlyUpdate) {
		slotMachineWidth = $('#slot-machine').width();
	}
	const size = (slotMachineWidth-50)/Object.keys(predictedGrades).length;

	if (size < 45) {
		if (horizontal) {
			horizontal = false;
			$('#slots-wrapper').addClass('vertical');

			slotsCount = Math.floor(slotMachineWidth/(18*18));
			if (slotsCount < 1) slotsCount = 1;
		}
		else if (onlyUpdate) {
			slotsCount = Math.floor(slotMachineWidth/(18*18));
			if (slotsCount < 1) slotsCount = 1;
		}
		

		if ($('.slots').length > slotsCount) {
			$('.slot').each(function (index) {
				$('.slots').get(index % slotsCount).append(this);
			});

			for (let i = slotsCount; i < $('.slots').length; i++) {
				$('.slots').get(i).remove();
			}
		}
		else if ($('.slots').length < slotsCount) {
			for (let i = 1; i < slotsCount; i++) {
				$('#slots-wrapper').append('<div class="slots"><div class="slot-target"></div></div>');
			}

			$('.slot').each(function (index) {
				$('.slots').get(index % slotsCount).append(this);
			});
		}
	}
	else {
		if (horizontal) return;
		horizontal = true;
		$('#slots-wrapper').removeClass('vertical');

		if ($('.slots').length > 1) {
			$('.slot').each(function () {
				$('.slots').get(0).append(this);
			});

			for (let i = 1; i < slotsCount; i++) {
				$('.slots').get(i).remove();
			}
		}
		slotsCount = 1;
	}
}
$(window).on('resize', resize);
$(window).ready(resize);

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
		<img src="/images/${subject.id}.png" alt="Icon of ${subject.name}">
		<h3>${subject.name}</h3>
		<div class="predicted-grade-controls">
			<div id="${subject.id}-down" class="arrow-div"><i class="arrow arrow-left"></i></div>
			<p id="${subject.id}-grade">${predictedGrades[subject.name] ? predictedGrades[subject.name].grade : ''}</p>
			<div id="${subject.id}-up" class="arrow-div"><i class="arrow arrow-right"></i></div>
		</div>
	</div>`);

	function changeValue(value, subject) {
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

				if (i === gradeIndex) total = total * 5 + 100;
				else if (i+1 === gradeIndex) total = total * 4 + 80;
				else if (i+2 === gradeIndex) total = total * 3 + 50;
				else if (i+3 === gradeIndex) total = total * 2 + 20;
				else if (i+4 === gradeIndex) total = total * 1 + 10;
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
			if (gradeIndex < 0) changeValue('', subject);
			else changeValue(grades[gradeIndex].grade, subject);
		}
		else changeValue(grades[grades.length-1].grade, subject);
		
	});
	$(`#${subject.id}-up`).on('click', () => {
		if (predictedGrades[subject.name]) {
			let gradeIndex = grades.findIndex(grade => grade.grade == predictedGrades[subject.name].grade) + 1;
			if (gradeIndex > grades.length-1) changeValue('', subject);
			else changeValue(grades[gradeIndex].grade, subject);
		}
		else changeValue(grades[0].grade, subject);
	});
}

var longestDuration = 0;
function updateSlots(full = false) {
	$('#results').css('display', 'none');

	if (spinTimeout) {
		clearTimeout(spinTimeout);
		document.getElementById('audio-spin').pause();
		document.getElementById('audio-success').pause();
		spinTimeout = null;
	}

	$('.slots').empty();
	$('.slots').append('<div class="slot-target"></>');
	if (Object.keys(predictedGrades).length > 0) {
		canSpin = true;
		$('#slots-wrapper').css('display', 'flex');
		$('#spin-button').text('Get My Grades!');
		$('#spin-button').css('cursor', 'pointer');
	}
	else {
		canSpin = false;
		$('#slots-wrapper').css('display', 'none');
		$('#spin-button').text('v Select Your Predicted Grades v');
		$('#spin-button').css('cursor', 'not-allowed');
	}

	let index = 0;
	results = [];

	for (let [subjectName, predictedGrade] of Object.entries(predictedGrades)) {
		let slot = $('<div class="slot"></div>');
		slot.append(`<div class="slot-title"><img src="/images/${predictedGrade.id}.png" alt="Icon of ${subjectName}"></div>`);

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
	
				if (z === 39) {
					slotGrades.append(`<div class="slot-grade slot-grade-actual">${grade}</div>`);
					results.push({ name: subjectName, predictedGrade: predictedGrade.grade, grade: grade });
				}
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

		$('.slots').eq(index % slotsCount).append(slot);
		index++;
	}
	if (!full) resize(true);
}

function spin() {
	if (!canSpin) return;
	updateSlots(true);
	document.getElementById('audio-spin').currentTime = 0;
	document.getElementById('audio-spin').play();
	canSpin = false;
	$('#spin-button').text('Calculating...');
	$('#spin-button').css('cursor', 'not-allowed');
	$('.slot-grades').addClass('spin');

	spinTimeout = setTimeout(() => {
		$('.slot-grades').css('animation-duration', '0s');
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
			showResults();
		}, 1000);
	}, longestDuration*1000);
}

$('#spin-button').on('click', spin);


// Results canvas
function showResults() {
	if (results.length === 0) return;
	results = results.sort((a, b) => a.name > b.name);

	let totalHeight = (results.length*30+200);
	if (totalHeight < 842) totalHeight = 842;

	let canvas = document.getElementById('results-canvas');
	canvas.height = totalHeight;
	let context = canvas.getContext('2d');

	context.fillStyle = 'white';
	context.fillRect(0, 0, 595, totalHeight);

	context.fillStyle = 'black';
	context.font = '25px Arial';
	context.fillText('GCSE Results', 30, 50);

	context.font = 'italic 12px Arial';
	context.fillText('Not official results - a joke generated at gcsegrader.joshheng.co.uk', 30, 75);

	context.moveTo(20, 90);
	context.lineTo(575, 90);
	context.stroke();

	context.font = 'bold 16px Arial';
	context.fillText('Title', 30, 115);
	context.fillText('Grade', 380, 115);
	context.fillText('Predicted Grade', 445, 115);

	context.moveTo(20, 130);
	context.lineTo(575, 130);
	context.stroke();

	context.font = '16px Arial';
	currentHeight = 170;
	for (let result of results) {
		context.fillText(result.name, 30, currentHeight);
		context.fillText(result.grade, 380, currentHeight);
		context.fillText(result.predictedGrade, 445, currentHeight);
		currentHeight += 30;
	}

	let url = canvas.toDataURL();
	$('#results-image').attr('src', url);
	$('#results-download').attr('href', url);
	$('#results').css('display', 'block');
}

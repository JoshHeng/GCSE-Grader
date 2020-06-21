const slotNum = 15;
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
var gradeTotal = 0;

function getGrade() {
	let randomNumber = Math.floor(Math.random()*gradeTotal);

	for (grade of grades) {
		if (randomNumber <= grade.total) return grade.grade;
	}
}

for (grade of grades) {
	gradeTotal += grade.proportion
	grade.total = gradeTotal;
}

for (let i = 0; i < slotNum; i++) {
	let slot = $('<div class="slot"></div></div>');
	let slotGrades = $('<div class="slot-grades"></div>');

	for (let z = 0; z < 3; z++) {
		let grade = getGrade();
		slotGrades.append(`<div class="slot-grade">${grade}</div>`);
	}

	slot.append(slotGrades);
	$('#slots').append(slot)
}
$('#slots').append('<div class="slot-target"></div>');


let spinning = false;
function spin() {
	if (spinning) return;
	spinning = true;

	$('#slots').empty();
	$('#spin-button').text('Generating Grades...');
	$('#spin-button').css('cursor', 'not-allowed');

	let longestDuration = 0;
	for (let i = 0; i < slotNum; i++) {
		let slot = $('<div class="slot"></div></div>');
		let duration = Math.random()*4+4;
		if (duration > longestDuration) longestDuration = duration;

		let slotGrades = $(`<div class="slot-grades" style="animation-name: spin; animation-duration: ${duration}s"></div>`);

		for (let z = 0; z < 41; z++) {
			let grade = getGrade();
			if (z === 39) slotGrades.append(`<div class="slot-grade slot-grade-actual">${grade}</div>`);
			else slotGrades.append(`<div class="slot-grade slot-grade-fill">${grade}</div>`);
		}
	
		slot.append(slotGrades);
		$('#slots').append(slot)
	}
	$('#slots').append('<div class="slot-target"></div>');

	setTimeout(() => {
		$('.slot-grades').css('duration', 0);
		$('.slot-grade-actual').addClass('grown-slot-grade');
		$('.slot-grade-fill').addClass('hidden-slot-grade');

		setTimeout(() => {
			$('#spin-button').text('Respin!');
			$('#spin-button').css('cursor', 'pointer');
			spinning = false;
		}, 2000);
	}, longestDuration*1000);
}

$('#spin-button').on('click', spin);
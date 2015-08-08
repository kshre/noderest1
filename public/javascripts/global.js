// Userlist data array to fill the info box
var userListData = [];

// DOM Ready ======================================
$(document).ready(function() {

	// Populate user table on page load
	populateTable();
	
	// Username link click
	$('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

	// Add User button click
	$('#btnAddUser').on('click', addUser);
});

// Function ========================================

function populateTable() {
	
	// Empty content string
	var tableContent = '';
	
	// jQuery AJAX call for JSON
	$.getJSON('users/userlist', function( data ) {
		// Store the recieved user data array into the variable in the global object
		userListData = data;	
		
		// For each item in the JSON, add a table row and cells to the content string
		$.each(data, function() {
			tableContent += '<tr>';
			tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
			tableContent += '<td>' + this.email + '</td>';
			tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '"> delete </a></td>';
			tableContent += '</tr>';
		});
		
		// Inject the whole content string into our existing HTML table
		$('#userList table tbody').html(tableContent);
	});	
};

// Show User Info
function showUserInfo(event) {

	// Prevent link from firing
	event.preventDefault();

	// Retrive username from link rel attribute
	var thisUsername = $(this).attr('rel');

	// Get index of object based on id value
	var arrayPosition = userListData.map(function( arrayItem ) { return arrayItem.username }).indexOf(thisUsername);

	// Get object based on the index calculated above
	var thisUserObject = userListData[arrayPosition];

	// Populate Info Box
	$('#userInfoName').text(thisUserObject.fullname);
	$('#userInfoAge').text(thisUserObject.age);
	$('#userInfoGender').text(thisUserObject.gender);
	$('#userInfoLocation').text(thisUserObject.location);

};	

function addUser(event) {
	event.preventDefault();

	// Basic validation - increase errorCount variable if any of the fields are blank
	var errCount = 0;
	$('#addUser input').each(function(index, val) {
		if($(this).val() === '') {errCount++;}
	});

	// Check and make sure that errCount is still at zero
	if(errCount === 0) {
		var newUser = {
			'username': $('#addUser fieldset input#inputUserName').val(),
			'email': $('#addUser fieldset input#inputUserEmail').val(),
			'fullname': $('#addUser fieldset input#inputUserFullname').val(),
			'location': $('#addUser fieldset input#inputUserLocation').val(),
			'age': $('#addUser fieldset input#inputUserAge').val(),
			'gender': $('#addUser fieldset input#inputUserGender').val()
		};

		// Use AJAX to post the object to our adduser service
		$.ajax({
			type: 'POST',
			data: newUser,
			url: '/users/adduser',
			dataType: 'JSON'
		}).done(function( response ) {
	
			// Check for sucessful (blank) response
			if (response.msg === '') {
				// Clear the form inputs
				$('#addUser fieldset input').val('');
	
				// Update the table
				populateTable();
			} else {
				// If something goes wrong, alert the error message that our service returned
				alert('Error:' + response.msg);
	
			}
		});
	}
	else {
		// If errorCount is more than 0, error out
		alert('Please fill in all fields');
		return false;
	}
};

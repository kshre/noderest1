// Userlist data array to fill the info box
var userListData = [];

// DOM Ready ======================================
$(document).ready(function() {

	// Populate user table on page load
	populateTable();
	
	// Username link click
	$('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
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



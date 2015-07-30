// Userlist data array for filling in the box
var userListData = [];

// DOM Ready ===============================================================
$(document).ready(function() {
	
	// Populate the user table on initial page load
	populateTable();
	
	// Username link click
	$('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
});

// Functions ================================================================

// Fill table with data
function populateTable() {
	
	// Empty content string
	var tableContent = '';

	// jQuery AJAX call for JSON
	$.getJSON( '/users/userlist', function( data ) {
		
		// Stick our user data array into a userlist variable in the global object
		userListData = data;
		
		// For each item in our JSON, add a table row and cells to the content string
		$.each(data, function(){
			tableContent += '<tr>';
			tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
			tableContent += '<td>' + this.email + '</td>';
			tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
			tableContent += '</tr>';
		});	

		// Inject the whole content string into our existing HTML table
		$('#userList table tbody').html(tableContent);
	});
};

// Show user info
function showUserInfo(event) {
	
	// Prevent link from firing
	event.preventDefault();

	// Retrieve username from link rel attribute
	var thisUserName = $(this).attr('rel');

	// Get index of object based on id value
	var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);
	
	// Get our User Object
	var thisUserObject = userListData[arrayPosition];
	
	// Populate Info Box
	$('#userInfoName').text(thisUserObject.fullname);
	$('#userInfoAge').text(thisUserObject.age);
	$('#userInfoLocation').text(thisUserObject.location);
	$('#userInfoGender').text(thisUserObject.gender);

};


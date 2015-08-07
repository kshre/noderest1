// Userlist data array to fill the info box
var userListData = [];

// DOM Ready ======================================
$(document).ready(function() {

	// Populate user table on page load
	populateTable();

});

// Function ========================================

function populateTable() {
	
	// Empty content string
	var tableContent = '';
	
	// jQuery AJAX call for JSON
	$.getJSON('users/userlist', function( data ) {
		
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

# What is dropfile.js
dropfile.js is a shim/polyfill for adding support for dragging files from the desktop to IE browsers prior to IE10 and FF prior to 3.6 browsers

*Demo* http://mrswitch.github.com/dropfile/demo.htm

*Video* http://vimeo.com/18326844

<iframe src="http://player.vimeo.com/video/18326844" width="400" height="300" style="float:right;" frameborder="0"></iframe> 


# How to use dropfile.js

1. Save *dropfile.js* and *dropfile.xap* into the same directory on your site.

2. Add to the bottom of you page the dropfile.js script `<script src="somepath/dropfile.js"></script>`

3. Add HTML5 code for handling the action on an element, here i'm attaching event handling to my #holder element.

		window.onload = function () {
		    var holder = document.getElementById('holder');
		    holder.ondragover = function () { return false; };
		    holder.ondragenter = function () { return false; };
		    holder.ondrop = function (e) {
		        e = e || window.event;
		
		        // Read from e.files, as well as e.dataTransfer
		        var files = (e.files || e.dataTransfer.files);
		
		        var s = "";
		        for (var i = 0; i < files.length; i++) {
		            (function (i) {
		                var reader = new FileReader();
		                reader.onload = function (event) {
		                    holder.innerHTML = "<li><img src='" + event.target.result + "' /> " + (files[i].name) + "</li>" + holder.innerHTML;
		                };
		                reader.readAsDataURL(files[i]);
		            })(i);
		        }
		
		        return false;
		    };
		}

# Working with jQuery

jQuery and other API's, wrap the original javascript event object and makes it available at e.originalEvent. This script does not recognise jQuery but does recognise the ondrop event that was assigned by jQuery and will execute that when used. However now the original event object is passed to the handler not the wrapped up event object used in jQuery. But not to worry its easy to write code which can accomodate both approaches. See http://mrswitch.github.com/dropfile/demo-jquery.htm


# Browser Support

<table>
	<tr>
		<td >Browser</td>
		<th >IE7</th>
		<th >IE8</th>
		<th >IE9</th>
		<th >IE10</th>
		<th >FF3.5</th>
		<th >FF3.6</th>
		<th >Chrome 6+</th>
		<th >Safari 5 (win)</th>
		<th >Safari 6 (win)</th>
		<th >Opera 10</th>
	</tr>
	<tr>
		<th>File API / dropfile</th>
		<td colspan=3>dropfile</td>
		<td>File API</td>
		<td>dropfile</td>
		<td>File API</td>
		<td>File API</td>
		<td>dropfile</td>
		<td>File API</td>
		<td>no<sup>1</sup></td>
	</tr>
</table>


1. Silverlight does not run in Opera, nor does Opera support the File API



# Contribute

1. MIT license, so anyone can use it, modify it, and add it to their own application.
2. "source" folder contains the Visual Studiio Solution files if you fancy modifying the code

## How it works

This fix works by "polyfilling" browsers which dont support the File API ... aka, they also dont expose file data when a file drop triggers a dropevent.

We take advantage of silverlight which does support the dragging files in. So to add this to native HTML elements in the background a dragenter event gets hijacked by a silverlight widget which sneaks under the mouse cursor and picks up the file data. The Silverlight widget then interacts with javascript, transfering data about the file(s) being dropped, which then triggers the `ondrop` drop event on the element.

### Break down of code

1. Checks whether the browser needs has no support for the File API and 
2. Adds a silverlight object to the page and hides it by positioning it outside the window view
3. Adds `ondragenter` event to the `window.document` and performs the following actions:
4. The silverlight widget follows the mouse cursor
5. Creates `window.dropfile` in the scope of the element.
6. When files gets dropped on to the Silverlight widget, the Silverlight widget passes file data over to `window.dropfile` which triggers the ondrop event on that element in scope - An example of which is in the sample code below.


## Why it was done this way, rather than... 

1. Why not, Make the Silverlight object transparent over element. 

	*answer*: The Silverlight object needs to be in "windowless" mode for transparency, however in this mode we lose the drag and drop UI. See http://msdn.microsoft.com/en-us/library/cc838156(VS.95).aspx

2. Why not, Add drop functionality implictly to objects

	*answer*: So this is the Event Delegation vs Event Handling argument. Using Event Delegation we add this to the document ondragenter event and explicitly add this to elements which match a condition as the user drags over elements, thus avoiding having to add functional code.
	
3. Why not, Update e.dataTransfer.files instead of having to write (e.files||e.dataTransfer.files)

	*answer*: The Event object dataTransfer is immutable therefore we can only pass in a bespoke method. This is only for IE8 and less, in IE9 we can define the dataTransfer files. 

4. Why not... Call the widget on just the elements which have an ondrop event, rather than the whole doc.

	*answer*: initially i required elements to have a flag to say, yes this has an ondropevent because there is no way to find out if they do (i.e. "Event delegation"). And it's too much hassle to add classNames, i guess i could add a strict mode, but i wanted a script that could be "dropped in", if you'll pardon the pun.


## To Do

Shim up `<input type="file" onchange="handleFiles(this.files)" >`. Aka.. add file references to the file object + trigger te onchange event.
# What is dropfile.js
dropfile.js is a shim/polyfill for adding support for dragging files from the desktop to IE browsers prior to IE10 and FF prior to 3.6 browsers

# Demo
http://mrswitch.github.com/dropfile/

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


# Contribute

1. MIT license, so anyone can use it, modify it, and add it to their own application.
2. "source" folder contains the Visual Studiio Solution files if you fancy modifying the code


## To Do

Shim up `<input type="file" onchange="handleFiles(this.files)" >`. Aka.. add file references to the file object + trigger te onchange event.
module.exports = ''+
'		<div class="box">'+
'			<h1>box.js home demo</h1>'+
'			<p>name: {{=it.name}}</p>'+
'			{{?it.state == 1}}'+
'				<p>state: 1</p>'+
'			{{??}}'+
'				<p>state: 2</p>'+
'			{{?}}'+
'			<p>each array</p>'+
'			<ul>'+
'			{{~it.list:item:index}}'+
'				<li>{{=index}} -- {{=item}}</li>'+
'			{{~}}'+
'			<p>each object</p>'+
'			<ol>'+
'			{{for(var prop in it.object){ }}'+
'				<li>{{=prop}} -- {{=it.object[prop]}}</li>'+
'			{{ } }}'+
'			</ol>'+
'		</div>';
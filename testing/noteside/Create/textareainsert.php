<?php include 'hidden/createnote.php'; ?><head>
	<meta charset="utf-8">
	<meta author="jamesac">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<link href="https://fonts.googleapis.com/css?family=Dosis|Eczar|Share+Tech+Mono|Ubuntu|Ubuntu+Mono" rel="stylesheet">
	<script src="/js/wordcount.js"></script>
	<title>Create Note</title>
	<link href="/css/textarea.css" rel="stylesheet">
	<link rel="icon" href="images/favicon.ico" type="image/x-icon">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-75497871-2', 'auto');
	  ga('send', 'pageview');
	</script>
</head>
<body>
<div class="navbar-div">
	<ul class="navbar left">
		<li><a id="nav-header" href="/"><strong>Noteside</strong></a></li>
		<li><a href="/create">Create</a></li>
	</ul>
	<ul class="navbar right">
		<li><a href="/account">Account</a></li>
		<li><a href="/notes.php">Notebook</a></li>
	</ul>
</div>
<div class="sidebar-wrapper" id="counter-wrapper">
	<div class="sidebar-window" id="counter-window">
		<div class="window-container">
			<div class="header-div">
				<span class="sidebar-head" id="counter-head"><strong>Word Count</strong></span>
			</div>
			<div id="stat-div">
				<div class="stat-entry"><span class="no-text">Type Something!</span></div>
			</div>
		</div>
	</div>
	<div class="sidebar-tab" id="counter-tab"><strong>0</strong></div><div id="counter-pointer" class="pointer-end-tab"></div>	
</div>
<div class="sidebar-wrapper" id="info-wrapper"><!--none-->
	<div class="sidebar-window" id="info-window"><!--default-->
		<div class="window-container">
			<div class="header-div">
				<span class="sidebar-head" id="info-head"><strong>Note Info</strong></span>
			</div>
			<div class="window-inner-div" id="form-submit-div">
				<form action="" method="post" id="submit-note">
					<div class="row">
						<div class="col">
							<label for="title-input">Title</label>
							<input name="note-title" id="title-input" type="text" required></input>
						</div>
						<div class="col">
							<label for="section-input">Chapter/ Section</label>
							<input name="section-name" id="section-input" type="text" required>
						</div>
					</div>
					<div class="row">
						<div class="col">
							<label for="class-input">Class</label>
							<select name="class-name" id="class-input" required>
								<?php
									$sqlgetclasses = "SELECT * FROM user_classes WHERE username='$username';";
									$getclasses = mysql_query($sqlgetclasses);
									if(mysql_num_rows($getclasses) == 0){
										echo "<option disabled>You have no classes!</option>";
									}else{
										while ($class = mysql_fetch_assoc($getclasses)) {
											$classname = $class['classname'];
											echo '<option value="' . $classname . '">' . $classname . '</option>';
										}
									}
								  ?>
							</select>
						</div>
						<div class="col">
							<label for="teacher-input">Teacher</label>
							<select name="teacher-name" id="teacher-input" required>
								<?php
									$sqlgetteachers = "SELECT * FROM user_teachers WHERE username='$username';";
									$getteachers = mysql_query($sqlgetteachers);
									if(mysql_num_rows($getteachers) == 0){
										echo "<option disabled>You have no teachers!</option>";
									}else{
										while ($teacher = mysql_fetch_assoc($getteachers)) {
											$teachername = $teacher['teacher'];
											echo '<option value="' . $teachername . '">' . $teachername . '</option>';
										}
									}
								  ?>
							</select>
						</div>
					</div>
					<div class="row">
						<div class="col">
							<button type="submit" id="submit-button" class="btn" name="action" value="note-submit">Create</button>
						</div>
						<div class="col">
							<button id="save-button" type="button" onclick="save('manual')" class="btn">Save</button>
						</div>
					</div>
				</form>
			</div>
			<div class="header-div">
				<span class="sidebar-head" id="settings-head"><strong>Settings</strong></span>
				<div class="window-inner-div" id="settings-div">
					<div class="row">
						<div id="fontfamily-setting-div" class="col">
							<select id="fontfamily-select" class="font-setting-select" name="fontfamily">
								<option id="ubuntu-mono-option" value="Ubuntu Mono">Ubuntu Mono</option>
								<option id="ubuntu-option" value="Ubuntu">Ubuntu</option>
								<option id="dosis-option" value="Dosis">Dosis</option>
								<option id="eczar-option" value="Eczar">Eczar</option>
								<option id="sharetech-option" value="Share Tech Mono">Share Tech Mono</option>
							</select>
						</div>
						<div id="fontsize-setting-div" class="col">
							<select id="fontsize-select" class="font-setting-select" name="fontsize">
								<option value="16" select="selected">16</option>
								<option value="18">18</option>
								<option value="20">20</option>
								<option value="22">22</option>
								<option value="24">24</option>
								<option value="26">26</option>
								<option value="28">28</option>
								<option value="30">30</option>
								<option value="34">34</option>
								<option value="56">56</option>
							</select>	
						</div>
					</div>
					<div class="row">
						<div class="col setting-desc">
							Spacing
						</div>
						<div class="col">
							<select id="spacing-select" class="font-setting-select" name="linespacing">
								<option value="1">1</option>
								<option value="1.5">1.5</option>
								<option value="1.75">1.75</option>
								<option value="2">2</option>
							</select>
						</div>
					</div>
					<div class="row">
						<div class="col setting-desc">
							Auto Save
						</div>
						<div class="col">
							<button value="on" class="btn setting-btn" type="button" onclick="toggleAutoSave()" id="auto-save-btn">On</button>
						</div>
					</div>
					<div class="row">
						<div class="col setting-desc">
							Private
						</div>
						<div class="col">
							<button value="public" class="btn setting-btn" type="button" onclick="WQhideNoteToggle()" form="submit-note" id="hide-note-btn">Off</button>
						</div>
					</div>
					<div class="row">
						<div class="col setting-desc">
							Protect Note
						</div>
						<div class="col">
							<button value="unprotected" class="btn setting-btn" type="button" onclick="protectNoteToggle()" form="submit-note" id="protect-note-btn">Off</button>
						</div>
					</div>
					<div class="row" id="protectedPasswordRow">
						<input name="protectedPassword" type="password" id="protectedPassword" placeholder="Password">
					</div>
					<div class="row">
						<div class="col setting-desc">
							Clear Editor
						</div>
						<div class="col">
							<button class="btn setting-btn" type="button" onclick="wipeEditor()" id="clear-editor-btn">X</button>
						</div>
					</div>
					<div class="row">
						<div class="col setting-desc">
							Wipe Save
						</div>
						<div class="col">
							<button class="btn setting-btn" type="button" onclick="wipeSave()" id="wipe-save-button">X</button>
						</div>
					</div>
				</div>
			</div>
			<div></div>
		</div>
	</div>
	<div class="sidebar-tab" id="info-tab">General</div><div id="info-pointer" class="pointer-end-tab"></div><!--default-->
</div>
<div class="container">
	<h1>Create</h1><hr>
	<div id="format-bar-div">
		<ul id="format_bar">
			<div id="header-outer-ctrl">
				<li id="headers-toggle" class="dropdown format-li">
					<a href="#" class="dropbtn">Headers</a></li>
				<li id="header-content format-li">
					<div class="headers-div" id="headers-div"><ul>
						<li class="header-insert"><a id="header1"  class="format-insert" onclick="insertForm('\n\n# ')" href="#">H1</a></li>
						<li class="header-insert"><a id="header2"  class="format-insert" onclick="insertForm('\n\n## ')" href="#">H2</a></li>
						<li class="header-insert"><a id="header3"  class="format-insert" onclick="insertForm('\n\n### ')" href="#">H3</a></li>
						<li class="header-insert"><a id="header4"  class="format-insert" onclick="insertForm('\n\n#### ')" href="#">H4</a></li>
						<li class="header-insert"><a id="header5"  class="format-insert" onclick="insertForm('\n\n##### ')" href="#">H5</a></li>
						<li class="header-insert"><a id="header6"  class="format-insert" onclick="insertForm('\n\n###### ')" href="#">H6</a></li>
					</ul></div>
				</li>
			</div>
			<li class="format-li"><a id="bold"   class="format-insert" onclick="insertForm('*bold*')">Bold</a></li>
			<li class="format-li"><a id="bullet" class="format-insert" onclick="insertForm('\n\n- ')">Bullet</a></li>
			<li class="format-li"><a id="list" class="format-insert" onclick="insertForm('\n\n1. ')">List</a></li>
			<li class="format-li"><a id="quote" class="format-insert" onclick="insertForm('\n\n> ')">Quote</a></li>
			<li class="format-li"><a id="link" class="format-insert" onclick="insertLink()">Link</a></li>
			<li class="format-li"><a id="inline-code" class="format-insert" onclick="insertForm('`code`')">Inline Code</a></li>
			<li class="format-li"><a id="code-block" class="format-insert" onclick="insertForm('\n\n\    codeblocks are indented by 4 spaces')">Code Block</a></li>
		</ul>
	</div>
	<textarea name="note-content" id="text_area" form="submit-note" required></textarea>
</div>
<script src="textarea.js"></script>
</body>
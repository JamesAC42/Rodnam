<?php session_start(); 
	include 'Parsedown.php';
	include 'hidden/config.php';
	if($_SERVER["REQUEST_METHOD"] == "GET") {
		$noteid = htmlspecialchars($_GET['id']);
		
		$sqlnoteinfo = "SELECT * FROM ns_notes WHERE id='$noteid';";
		
		$noteinforesult = mysql_query($sqlnoteinfo);
		if(mysql_num_rows($noteinforesult) == 0){
			die("That note does not exist"); exit();
		}
		$noteinfo = mysql_fetch_array($noteinforesult);
		
		$filename = '../notes/' . $noteinfo['filename'];
		$notecontentfile = fopen($filename, "r");
		clearstatcache();
		$notecontentraw = fread($notecontentfile, filesize($filename));
		$noteformat = htmlentities($notecontentraw, ENT_QUOTES, 'UTF-8');
		$Parsedown = new Parsedown();
		$noteformat = $Parsedown->text($notecontentraw);
		fclose($notecontentfile);
		if(isset($_SESSION['loginuser'])){
			$username = $_SESSION['loginuser'];
			$sqlnotesaved = "SELECT * FROM user_saved_notes WHERE noteid='$noteid' and username='$username';";
			$notesaved = mysql_query($sqlnotesaved);
			$issavedbyuser = mysql_num_rows($notesaved);
			$loggedin = true;
		}
		
		$sqlnotehowmanysaved = "SELECT * FROM user_saved_notes WHERE noteid='$noteid';";
		$notehowmany = mysql_query($sqlnotehowmanysaved);
		$savestat = mysql_num_rows($notehowmany);
		
	}else{
		header('location:/');
	}
?>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<link href="/css/note.css" rel="stylesheet">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<link href="https://fonts.googleapis.com/css?family=Ubuntu|Ubuntu+Monoz|Eczar" rel="stylesheet">
	<script src="/js/note.js"></script>
	<title><?php echo htmlentities($noteinfo['title']); ?></title>
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
	<div class="container">
		<script>
			function deleteNote(){
				if(confirm("Are you sure you want to delete this note?")){
					 console.log('http://noteside.com/deletenote.php?note=' + '<?php echo $noteid; ?>');
					 console.log("null");
				}
			}
		</script>
		<div class="sidebar">
			<div class="toolbar-div">
				<ul class="toolbar">
					<li><a href="#" onclick="printPage()">Print</a></li>
					<?php
						if($loggedin){
							if($issavedbyuser > 0){
								echo "<li><a href='/unsavenote.php?id=" . $noteid . "'>Unsave</a></li>";
							}else{
								echo "<li><a href='/savenote.php?id=" . $noteid . "'>Save</a></li>";
							}
							if($noteinfo['creator'] == $_SESSION['loginuser']){
								echo "<li><a href='http://noteside.com/edit/" . $noteid . "'>Edit</a></li>";
								echo "<li><a href='/deletenote.php?note=" . $noteid . "'  id='delete-button'>Delete</a></li>";
							}
						}else{
							echo "<li><a href='/login'>Login to Save</a></li>";
						}
					?>
				</ul>
			</div>
		</div>
		<div class="note-container">
			<div class="note-title-div">
				<span class="note-title"><strong><?php echo htmlentities($noteinfo['title']); ?></strong></span>
			</div>
			<div class="note-info-div">
				<div class="note-info-row">
					<?php echo htmlentities($noteinfo['class_name']); ?>
				</div>
				<div class="note-info-row">
					Created By <a href="/user/<?php echo htmlentities($noteinfo['creator']); ?>"><?php echo htmlentities($noteinfo['creator']); ?></a> on <span>
					<?php echo $noteinfo['date_created']; ?></span>
				</div>
				<div class="note-info-row">
					<?php echo htmlentities($noteinfo['teacher']); ?>
				</div>
			</div>
			<div class="note-content">
				<?php 
					echo $noteformat; 
				?>
			</div>
		</div>
	</div>
</body>
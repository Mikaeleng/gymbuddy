<?php
 	require_once("Rest.inc.php");

	class API extends REST {
	
		public $data = "";


		const DB_SERVER = "localhost";
		const DB_USER = "root";
		const DB_PASSWORD = "a11nilen!";
		const DB = "gymbuddy";

 	/*Live server :
		const DB_SERVER = "mysql13.cliche.se";
		const DB_USER = "mikaeleng.se";
		const DB_PASSWORD = "QdAAAeA9";
		const DB = "mikaeleng_se";
	*/

		private $db = NULL;
		private $mysqli = NULL;
		public function __construct(){
			parent::__construct();				// Init parent contructor
			$this->dbConnect();					// Initiate Database connection
		}
		
		/*
		 *  Connect to Database
		*/
		private function dbConnect(){
			$this->mysqli = new mysqli(self::DB_SERVER, self::DB_USER, self::DB_PASSWORD, self::DB);
			$this->mysqli->set_charset('utf8_swedish_ci');
		}
		
		/*
		 * Dynmically call the method based on the query string
		 */
		public function processApi(){
			$func = strtolower(trim(str_replace("/","",$_REQUEST['x'])));
			if((int)method_exists($this,$func) > 0)
				$this->$func();
			else
				$this->response('',404); // If the method not exist with in this class "Page not found".
		}
				
		private function login(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			$email = $this->_request['email'];		
			$password = $this->_request['pwd'];
			if(!empty($email) and !empty($password)){
				if(filter_var($email, FILTER_VALIDATE_EMAIL)){
					$query="SELECT uid, name, email FROM users WHERE email = '$email' AND password = '".md5($password)."' LIMIT 1";
					$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

					if($r->num_rows > 0) {
						$result = $r->fetch_assoc();	
						// If success everythig is good send header as "OK" and user details
						$this->response($this->json($result), 200);
					}
					$this->response('', 204);	// If no records "No Content" status
				}
			}
			
			$error = array('status' => "Failed", "msg" => "Invalid Email address or Password");
			$this->response($this->json($error), 400);
		}


		//////////////////////////////////////////////////////////////////////
		//
		//
		//					Insert Set
		//
		//
		//////////////////////////////////////////////////////////////////////
		private function insertSet(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}

			$data = json_decode(file_get_contents("php://input"),true);
			$column_names = array('workout', 'session_id', 'user_id', 'user_name','exercise', 'set', 'weights', 'reps');
			$keys = array_keys($data);
			$columns = '';
			$values = '';
			foreach($column_names as $desired_key){
				if(!in_array($desired_key, $keys)) {
					$$desired_key = '';
				}else{
					$$desired_key = $data[$desired_key];
				}
				$columns = $columns.$desired_key.',';
				$values = $values."'".$$desired_key."',";
			}
			$query = "INSERT INTO workouts(".trim($columns,',').") VALUES(".trim($values,',').")";
			if(!empty($data)){
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Customer Created Successfully.", "data" => $data);
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	//"No Content" status

		}


		private function weights(){	
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$query="SELECT distinct c.id, c.time, c.weight, c.user_id FROM weights c order by c.time desc";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

			if($r->num_rows > 0){
				$result = array();
				while($row = $r->fetch_assoc()){
					$result[] = $row;
				}
				$this->response($this->json($result), 200); // send user details
			}
			$this->response('',204);	// If no records "No Content" status
		}
		private function weight(){	
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$id = (int)$this->_request['id'];
			if($id > 0){	
				$query="SELECT distinct c.id, c.time, c.weight, c.user_id FROM weights c where c.id=$id";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0) {
					$result = $r->fetch_assoc();	
					$this->response($this->json($result), 200); // send user details
				}
			}
			$this->response('',204);	// If no records "No Content" status
		}
		
		private function insertWeight(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}

			$data = json_decode(file_get_contents("php://input"),true);
			$column_names = array('id', 'time', 'weight', 'user_id');
			$keys = array_keys($data);
			$columns = '';
			$values = '';
			foreach($column_names as $desired_key){ // Check the customer received. If blank insert blank into the array.
			   if(!in_array($desired_key, $keys)) {
			   		$$desired_key = '';
				}else{
					$$desired_key = $data[$desired_key];
				}
				$columns = $columns.$desired_key.',';
				$values = $values."'".$$desired_key."',";
			}
			$query = "INSERT INTO weights(".trim($columns,',').") VALUES(".trim($values,',').")";
			if(!empty($data)){
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Customer Created Successfully.", "data" => $data);
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	//"No Content" status
		}
		private function updateWeight(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			$data = json_decode(file_get_contents("php://input"),true);
			
			$id = (int)$data['id'];
			$column_names = array('id', 'time', 'weight', 'user_id');
			$keys = array_keys($data['weight']);
			$columns = '';
			$values = '';
			foreach($column_names as $desired_key){ // Check the weight received. If key does not exist, insert blank into the array.
			   if(!in_array($desired_key, $keys)) {
			   		$$desired_key = '';
				}else{
					$$desired_key = $data['weight'][$desired_key];
				}
				$columns = $columns.$desired_key."='".$$desired_key."',";
			}
			$query = "UPDATE weights SET ".trim($columns,',')." WHERE id=$id";
			if(!empty($data)){
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "weight ".$id." Updated Successfully.", "data" => $data);
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	// "No Content" status
		}
		
		private function deleteWeight(){
			if($this->get_request_method() != "DELETE"){
				$this->response('',406);
			}
			$id = (int)$this->_request['id'];
			if($id > 0){				
				$query="DELETE FROM weights WHERE id = $id";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Successfully deleted one record.");
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	// If no records "No Content" status
		}
		
		private function eatables(){	
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$query="SELECT distinct c.id, c.name, c.kcal, c.kj, c.carbohydrates, c.fat, c.protein, c.editable FROM foods c order by c.name Asc LIMIT 100";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

			if($r->num_rows > 0){
				$result = array();
				while($row = $r->fetch_assoc()){
					$result[] = $row;
				}

				$this->response($this->json($result), 200); // send user details
			}
			$this->response('',204);	// If no records "No Content" status
		}

		private function eatable(){	
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$id = (int)$this->_request['id'];
			if($id > 0){	
				$query="SELECT distinct c.id, c.name, c.kcal, c.kj, c.carbohydrates, c.fat, c.protein, c.editable FROM foods c where c.id=$id";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0) {
					$result = $r->fetch_assoc();	
					$this->response($this->json($result), 200); // send user details
				}
			}
			$this->response('',204);	// If no records "No Content" status
		}

		private function insertEatable(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}

			$data = json_decode(file_get_contents("php://input"),true);
			$column_names = array('name', 'kcal', 'carbohydrates', 'protein', 'fat', 'editable');
			$keys = array_keys($data);
			$columns = '';
			$values = '';
			foreach($column_names as $desired_key){ // Check the customer received. If blank insert blank into the array.
			   if(!in_array($desired_key, $keys)) {
			   		$$desired_key = '';
				}else{
					$$desired_key = $data[$desired_key];
				}
				$columns = $columns.$desired_key.',';
				$values = $values."'".$$desired_key."',";
			}
			$query = "INSERT INTO foods(".trim($columns,',').") VALUES(".trim($values,',').")";
			if(!empty($data)){
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Customer Created Successfully.", "data" => $data);
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	//"No Content" status
		}
		
		private function updateEatable(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			$data = json_decode(file_get_contents("php://input"),true);
			
			$id = (int)$data['id'];
			$column_names = array('id','name', 'kcal', 'carbohydrates', 'protein', 'fat');
			$keys = array_keys($data['eatable']);
			$columns = '';
			$values = '';
			foreach($column_names as $desired_key){ // Check the weight received. If key does not exist, insert blank into the array.
			   if(!in_array($desired_key, $keys)) {
			   		$$desired_key = '';
				}else{
					$$desired_key = $data['eatable'][$desired_key];
				}
				$columns = $columns.$desired_key."='".$$desired_key."',";
			}
			$query = "UPDATE foods SET ".trim($columns,',')." WHERE id=$id";
			if(!empty($data)){
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "eatable ".$id." Updated Successfully.", "data" => $data);
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	// "No Content" status
		}

			private function deleteEatable(){
			if($this->get_request_method() != "DELETE"){
				$this->response('',406);
			}
			$id = (int)$this->_request['id'];
			if($id > 0){				
				$query="DELETE FROM foods WHERE id = $id";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Successfully deleted one record.");
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	// If no records "No Content" status
		}

		private function navigation(){	
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$query="SELECT distinct * FROM navigation c order by c.label Asc";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

			if($r->num_rows > 0){
				$result = array();
				while($row = $r->fetch_assoc()){
					$result[] = $row;
				}
				$this->formatTree($result,0);
				$this->response($this->json($this->formatTree($result,0)), 200); // send user details
			}
			$this->response('',204);	// If no records "No Content" status
		}
		/*
		 *	Encode array into JSON
		*/

		//$tree - menu data array
//$parent - 0
		private function formatTree($tree, $parent){
	        $tree2 = array();
	        foreach($tree as $i => $item){
	            if($item['parent_id'] == $parent){
	                $tree2[$item['id']] = $item;
	                $tree2[$item['id']]['groups'] = $this->formatTree($tree, $item['id']);
	            }
	        }

	        return $tree2;
    	}

		private function json($data){
			if(is_array($data)){
				return json_encode($data);
			}
		}
	}
	
	// Initiiate Library
	
	$api = new API;
	$api->processApi();
?>
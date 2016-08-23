$(function(){
	shownum();
	
	function shownum(){
		if($("table#tabl1 tr td").text() == ""){
			$(".user_data table#tabl1").after("<div class='no_data'>您查询的日期内没有数据</div>");
			$(".hide_fy1").hide();
		}else{
			if($("table#tabl1 tr td").text() !== ""){
				$(".user_data table#tabl1 .no_data").hide();
				$(".hide_fy1").show();
			};
		};
		if($("table#tabl2 tr td").text() == ""){
			$(".user_data table#tabl2").after("<div class='no_data'>您查询的日期内没有数据</div>");
			$(".hide_fy2").hide();
		}else{
			if($("table#tabl2 tr td").text() !== ""){
				$(".user_data table#tabl2 .no_data").hide();
				$(".hide_fy2").show();
			};
		};
		if($("table#tabl3 tr td").text() == ""){
			$(".user_data table#tabl3").after("<div class='no_data'>您查询的日期内没有数据</div>");
			$(".hide_fy3").hide();
		}else{
			if($("table#tabl3 tr td").text() !== ""){
				$(".user_data table#tabl3 .no_data").hide();
				$(".hide_fy3").show();
			};
		};
		if($("table#tabl4 tr td").text() == ""){
			$(".user_data table#tabl4").after("<div class='no_data'>您查询的日期内没有数据</div>");
			$(".hide_fy4").hide();
		}else{
			if($("table#tabl4 tr td").text() !== ""){
				$(".user_data table#tabl4 .no_data").hide();
				$(".hide_fy4").show();
			};
		};
	};
	$(".nav_list ul li").click(function(){
		$(".nav_list ul li").removeClass("active");
		$(this).addClass("active");
		$(".user_data_list .user_data").hide().eq($('.nav_list ul li').index(this)).show();
		$(".inquire .after").hide().eq($('.nav_list ul li').index(this)).show(); 
	});
	
	if($(".new_tidings").html()<=0){
		$(".new_tidings").hide();
	};
	
	//$(".user_data table tr").hover(function(){
		//var index_1 = $(this).index();
		//$(this).addClass("table_bg");
		//$(".user_data table tr:first").removeClass("table_bg");
	//},function(){
		//$(this).removeClass("table_bg");
	//});
});
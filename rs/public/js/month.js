$(function(){
	$("#date_form_month").on("submit",function(e){
		var month_date = $("#custom1").val();
		var monthhtml;
		$(".ser_load").css("display","block");
		$(".ser_load").html("<img src='../img/load.gif' />");
		$.getJSON("http://"+parent.$raise.domain+"/data/daily?json=1&month_date="+month_date+"&type=1",function(result){
			var userInfo = result.userInfo;
			$(".ser_load").css("display","none");
			$.each(userInfo,function(k){
				monthhtml += '<tr onclick="a_lianj('+userInfo[k].sales_pid+','+'\''+result.startTime+'\''+','+'\''+result.endTime+'\''+','+'\''+userInfo[k].sales_real_name+'\')"><td>' + result.startTime
				+"</td>"+"<td>"+userInfo[k].sales_real_name
				+"</td>"+"<td>"+userInfo[k].sales_pid
				+"</td>"+'<td>'+userInfo[k].count
				+"</td>"+'<td>'+userInfo[k].totalAmount
				+"</td>"+'<td>'+userInfo[k].totalMoney
				+'</td>'+'<td>'+userInfo[k].yearTotalMoney
				+'</td></tr>'
			});
			$(".export1 a").attr("href",'http://'+parent.$raise.domain+'/data/daily?json=1&month_date='+month_date+'&type=1&export=1');
			
			$("#tbodyContent_month").html('');
			$("#tbodyContent_month").html(monthhtml);
			
			
			//分页
			$("#pagenation_m").html(result.pageHtml);
			$("#pagenation_m").children().children("a").on("click",function(){
				var index = $(this).parent("li").index();
				mon_ind = index+1;
				$("#pagenation_m").children().children("a").removeClass("bg_c");
				$(this).addClass("bg_c");
				$(".ser_load").html("<img src='../img/load.gif' />");
				report(month_date,result,mon_ind);
				return false;
			});
			
			
			$("#sum_month .sum_date span").html( result.startTime);
			$("#sum_month ul li:eq(0) span").html( result.pagePersonTotal+"/"+result.allPersonTotal);
			$("#sum_month ul li:eq(1) span").html( result.pageChargeTotal+"/"+result.allChargeTotal);
			$("#sum_month ul li:eq(2) span").html( result.pageDealsTotal+"/"+result.allDealsTotal);
			$("#sum_month ul li:eq(3) span").html( result.pageYearDealsTotal+"/"+result.allYearDealsTotal);
			
			
			if($('#tbodyContent_month tr').text()!==""){
				$(".user_data .no_data").hide();
				$("#pagenation_m li a:eq(0)").addClass("bg_c");
			};
		});
		return false;
	});
	function report(startTime,Result,index){
		$.ajax({
			type:"GET",
			url:"http://"+parent.$raise.domain+"/data/daily?json=1&month_date="+startTime+"&page="+index+'&type=1',//&expoet=1
			dataType:"json",
			beforeSend:function(){
				$(".ser_load").css("display","block");
			},
			success:function(month){
				var userInfo = month.userInfo;
				var monthhtml;
				$(".ser_load").css("display","none");
				$.each(userInfo,function(k){
					monthhtml += '<tr onclick="a_lianj('+userInfo[k].sales_pid+','+'\''+month.startTime+'\''+','+'\''+month.endTime+'\''+','+'\''+userInfo[k].sales_real_name+'\')"><td>' + month.startTime
					+"</td>"+"<td>"+userInfo[k].sales_real_name
					+"</td>"+"<td>"+userInfo[k].sales_pid
					+"</td>"+'<td>'+userInfo[k].count
					+"</td>"+'<td>'+userInfo[k].totalAmount
					+"</td>"+'<td>'+userInfo[k].totalMoney
					+'</td>'+'<td>'+userInfo[k].yearTotalMoney
					+'</td></tr>'
				});
				$("#tbodyContent_month").html('');
				$("#tbodyContent_month").html(monthhtml);
				
				$("#pagenation_m").html(month.pageHtml)
				$("#pagenation_m li a").on("click",function(){
					var month_date = $("#custom1").val();
					var Result = new Object();
					Result.startTime = month_date;
					var index = $(this).text();	
					report(month_date,Result,index);
					
					return false;
				});
				
				$("#sum_month .sum_date span").html( month.startTime);
				$("#sum_month ul li:eq(0) span").html( month.pagePersonTotal+"/"+month.allPersonTotal);
				$("#sum_month ul li:eq(1) span").html( month.pageChargeTotal+"/"+month.allChargeTotal);
				$("#sum_month ul li:eq(2) span").html( month.pageDealsTotal+"/"+month.allDealsTotal);
				$("#sum_month ul li:eq(3) span").html( month.pageYearDealsTotal+"/"+month.allYearDealsTotal);
			},
			error:function(){
				alert("错误");
				$(".ser_load").css("display","none");
			}
		});
		
	};

	
	
	
	
	
	
	
	
	
	$("#date_form_season").on("submit",function(){
		
		if($("#year").val()=="请选择"){
			$(".ser_load").css("display","none");
			alert("请选择开始日期");
		}else{
			if($("#quarterly").val()=="请选择"){
				$(".ser_load").css("display","none");
				alert("请选择结束日期");
			};
		};
		
		
		var year_data = $("#year").val();
		var quarterly_data = $("#quarterly").val();
		var html;
		$(".ser_load").html("<img src='../img/load.gif' />");
		$(".ser_load").css("display","block");
		$.getJSON("http://"+parent.$raise.domain+"/data/daily?json=1&year="+year_data+"&quarterly="+quarterly_data+"&type=2",function(result){
			var userInfo = result.userInfo;
			$(".ser_load").css("display","none");
			$.each(userInfo,function(k){
				html += '<tr onclick="a_lianj('+userInfo[k].sales_pid+','+'\''+result.startTime+'\''+','+'\''+result.endTime+'\''+','+'\''+userInfo[k].sales_real_name+'\')"><td>' + result.startTime
				+"</td>"+"<td>"+userInfo[k].sales_real_name
				+"</td>"+"<td>"+userInfo[k].sales_pid
				+"</td>"+'<td>'+userInfo[k].count
				+"</td>"+'<td>'+userInfo[k].totalAmount
				+"</td>"+'<td>'+userInfo[k].totalMoney
				+'</td>'+'<td>'+userInfo[k].yearTotalMoney
				+'</td></tr>'
			});
			$(".export2 a").attr("href","http://"+parent.$raise.domain+"/data/daily?json=1&year="+year_data+"&quarterly="+quarterly_data+"&type=2&export=1");
			
			$("#tbodyContent_season").html('');
			$("#tbodyContent_season").html(html);
			
			$("#pagenation_season").html(result.pageHtml);
			$("#pagenation_season").children().children("a").on("click",function(){
				var index = $(this).parent("li").index();
				index = index+1;
				$("#pagenation_season").children().children("a").removeClass("bg_c");
				$(this).addClass("bg_c");
				$(".ser_load").html("<img src='../img/load.gif' />");
				
				date_form_season(year_data,quarterly_data,result,index);
				
				return false;
			});
			
			
			
			$("#sum_season .sum_date span").html( result.startTime);
			$("#sum_season ul li:eq(0) span").html( result.pagePersonTotal+"/"+result.allPersonTotal);
			$("#sum_season ul li:eq(1) span").html( result.pageChargeTotal+"/"+result.allChargeTotal);
			$("#sum_season ul li:eq(2) span").html( result.pageDealsTotal+"/"+result.allDealsTotal);
			$("#sum_season ul li:eq(3) span").html( result.pageYearDealsTotal+"/"+result.allYearDealsTotal);
			
			if($('#tbodyContent_season tr').text()!==""){
				$(".user_data .no_data").hide();
				$("#pagenation_season li a:eq(0)").addClass("bg_c");
			};
		});
		
		return false;
	});
	function date_form_season(yearTime,quarterlyTime,Result,pageIndex){
		$.ajax({
			type:"GET",
			url:"http://"+parent.$raise.domain+"/data/daily?json=1&year="+yearTime+"&quarterly="+quarterlyTime+"&type=2"+"&page="+pageIndex,
			dataType:'json',
			beforeSend:function(){
				$(".ser_load").css("display","block");
			},
			success:function(season){
				$(".ser_load").css("display","none");
				var userInfo = season.userInfo;
				var html;
				$.each(userInfo,function(k){
					html += '<tr onclick="a_lianj('+userInfo[k].sales_pid+','+'\''+season.startTime+'\''+','+'\''+season.endTime+'\''+','+'\''+userInfo[k].sales_real_name+'\')"><td>' + season.startTime
					+"</td>"+"<td>"+userInfo[k].sales_real_name
					+"</td>"+"<td>"+userInfo[k].sales_pid
					+"</td>"+'<td>'+userInfo[k].count
					+"</td>"+'<td>'+userInfo[k].totalAmount
					+"</td>"+'<td>'+userInfo[k].totalMoney
					+'</td>'+'<td>'+userInfo[k].yearTotalMoney
					+'</td></tr>'
				});
				$("#tbodyContent_season").html('');
				$("#tbodyContent_season").html(html);
				
				$("#pagenation_season").html(season.pageHtml);
				$("#pagenation_season li a").click(function(){
					var year_data = $("#year").val();
					var quarterly_data = $("#quarterly").val();
					var Result = new Object();
					Result.startTime = year_data;
					Result.startTime = quarterly_data;
					var index = $(this).text();	
					date_form_season(year_data,quarterly_data,Result,index);
					
					return false
				});
				
				$("#sum_season .sum_date span").html( season.startTime);
				$("#sum_season ul li:eq(0) span").html( season.pagePersonTotal+"/"+season.allPersonTotal);
				$("#sum_season ul li:eq(1) span").html( season.pageChargeTotal+"/"+season.allChargeTotal);
				$("#sum_season ul li:eq(2) span").html( season.pageDealsTotal+"/"+season.allDealsTotal);
				$("#sum_season ul li:eq(3) span").html( season.pageYearDealsTotal+"/"+season.allYearDealsTotal);
			},
			error:function(){
				alert("错误");
				$(".ser_load").css("display","none");
			}
		});
		
	};
	
	
	$("#date_form_year").on("submit",function(){
		if($("#year_b").val()=="请选择"){
			alert("请选择开始日期");
		};
		
		var year_data = $("#year_b").val();
		var html;
		$(".ser_load").html("<img src='../img/load.gif' />");
		$(".ser_load").css("display","block");
		$.getJSON("http://"+parent.$raise.domain+"/data/daily?json=1&year="+year_data+"&type=3",function(result){
			var userInfo = result.userInfo;
			$(".ser_load").css("display","none");
			$.each(userInfo,function(k){
				html += '<tr onclick="a_lianj('+userInfo[k].sales_pid+','+'\''+result.startTime+'\''+','+'\''+result.endTime+'\''+','+'\''+userInfo[k].sales_real_name+'\')"><td>' + result.startTime
				+"</td>"+"<td>"+userInfo[k].sales_real_name
				+"</td>"+"<td>"+userInfo[k].sales_pid
				+"</td>"+'<td>'+userInfo[k].count
				+"</td>"+'<td>'+userInfo[k].totalAmount
				+"</td>"+'<td>'+userInfo[k].totalMoney
				+'</td>'+'<td>'+userInfo[k].yearTotalMoney
				+'</td></tr>'
			});
			$(".export3 a").attr("href","http://"+parent.$raise.domain+"/data/daily?json=1&year="+year_data+"&type=3&export=1");
			
			$("#tbodyContent_year").html("");
			$("#tbodyContent_year").html(html);
			
			
			//分页
			$("#pagenation_year").html(result.pageHtml);
			$("#pagenation_year li a").on("click",function(){
				var index1 = $(this).parent().index();
				index = index1+1;
				$("#pagenation_year").children().children("a").removeClass("bg_c");
				$(this).addClass("bg_c");
				date_form_year(year_data,result,index);
				return false;
			});
			
			
			$("#sum_year .sum_date span").html( result.startTime);
			$("#sum_year ul li:eq(0) span").html( result.pagePersonTotal+"/"+result.allPersonTotal);
			$("#sum_year ul li:eq(1) span").html( result.pageChargeTotal+"/"+result.allChargeTotal);
			$("#sum_year ul li:eq(2) span").html( result.pageDealsTotal+"/"+result.allDealsTotal);
			$("#sum_year ul li:eq(3) span").html( result.pageYearDealsTotal+"/"+result.allYearDealsTotal);
			
			if($('#tbodyContent_year tr').text()!==""){
				$(".user_data .no_data").hide();
				$("#pagenation_year li a:eq(0)").addClass("bg_c");
			};
		});
		
		
		return false;
	});
	
	function date_form_year(yearTime,Result,pageyearIndex){
		$.ajax({
			type:'get',
			url:"http://"+parent.$raise.domain+"/data/daily?json=1&year="+yearTime+"&type=3"+"&page="+pageyearIndex,
			dataType:'json',
			beforeSend:function(){
				$(".ser_load").css("dispaly","block");
			},
			success:function(year){
				var userInfo = year.userInfo;
				var html;
				$(".ser_load").css("display","none");
				$.each(userInfo,function(k){
					html += '<tr onclick="a_lianj('+userInfo[k].sales_pid+','+'\''+year.startTime+'\''+','+'\''+year.endTime+'\''+','+'\''+userInfo[k].sales_real_name+'\')"><td>' + year.startTime
					+"</td>"+"<td>"+userInfo[k].sales_real_name
					+"</td>"+"<td>"+userInfo[k].sales_pid
					+"</td>"+'<td>'+userInfo[k].count
					+"</td>"+'<td>'+userInfo[k].totalAmount
					+"</td>"+'<td>'+userInfo[k].totalMoney
					+'</td>'+'<td>'+userInfo[k].yearTotalMoney
					+'</td></tr>'
				});
				$("#tbodyContent_year").html("");
				$("#tbodyContent_year").html(html);
				
				$("#pagenation_year").html(year.pageHtml);
				$("#pagenation_year li a").click(function(){
					var year_data = $("#year_b").val();
					var Result = new Object();
					Result.startTime = year_data;
					var index = $(this).text();	
					date_form_year(year_data,Result,index);
					
					return false
				});
				
				
				
				
				$("#sum_year .sum_date span").html( year.startTime);
				$("#sum_year ul li:eq(0) span").html( year.pagePersonTotal+"/"+year.allPersonTotal);
				$("#sum_year ul li:eq(1) span").html( year.pageChargeTotal+"/"+year.allChargeTotal);
				$("#sum_year ul li:eq(2) span").html( year.pageDealsTotal+"/"+year.allDealsTotal);
				$("#sum_year ul li:eq(3) span").html( year.pageYearDealsTotal+"/"+year.allYearDealsTotal);
			},
			error:function(){
				alert("错误");
			}
		});
		
	};
	
	
	
});

















































$(function(){

$('#date_form').on('submit',function(e){
		
		var start_date = $("#inpstart").val();
		var end_date = $("#inpend").val();
		var html;
		if(start_date==""){
			alert("请输选择开始日期!");
		}else{
			if(end_date==""){
				alert("请选择结束日期!");
			}else{
				$(".ser_load").css("display","block");
			};
		};
		
		$(".ser_load").html("<img src='../img/load.gif' />");
		$.getJSON("http://"+parent.$raise.domain+"/data/daily?json=1&start_date="+start_date+"&end_date="+end_date+"&type=0",function(result){
			var userInfo = result.userInfo;
			$(".ser_load").css("display","none");
			//console.log(userInfo);
			$.each(userInfo,function(k){
				html += '<tr onclick="a_lianj('+userInfo[k].sales_pid+','+'\''+result.startTime+'\''+','+'\''+result.endTime+'\''+','+'\''+userInfo[k].sales_real_name+'\')"><td>' + result.startTime+"  -  "+result.endTime
				+"</td>"+"<td>"+userInfo[k].sales_real_name
				+"</td>"+"<td>"+userInfo[k].sales_pid
				+"</td>"+'<td>'+userInfo[k].count
				+"</td>"+'<td>'+userInfo[k].totalAmount
				+"</td>"+'<td>'+userInfo[k].totalMoney
				+'</td>'+'<td>'+userInfo[k].yearTotalMoney
				+'</td></tr>'
			});
			
			/*$.each(userInfo,function(k){
				html += '<tr><td>' + result.startTime+"  -  "+result.endTime+"</td>"+"<td>"+userInfo[k].sales_real_name+"</td>"
				+"<td>"+userInfo[k].sales_pid+"</td>"+'<td><a href="/data/all?pid='+userInfo[k].sales_pid+'&start_date='+result.startTime+'&end_date='+result.endTime+'&sale_name='+userInfo[k].sales_real_name+'&type=0">'
				+userInfo[k].count+"</a></td>"+'<td><a href="/data/all?pid='+userInfo[k].sales_pid+'&start_date='+result.startTime+'&end_date='+result.endTime+'&sale_name='+userInfo[k].sales_real_name+'&type=1">'+userInfo[k].totalAmount+"</a></td>"
				+'<td><a href="/data/all?pid='+userInfo[k].sales_pid+'&start_date='+result.startTime+'&end_date='+result.endTime+'&sale_name='+userInfo[k].sales_real_name+'&type=2">'+userInfo[k].totalMoney+
				'</a></td>'+'<td><a href="/data/all?pid='+userInfo[k].sales_pid+'&start_date='+result.startTime+'&end_date='+result.endTime+'&sale_name='+userInfo[k].sales_real_name+'&type=3">'+userInfo[k].yearTotalMoney+'</a></td></tr>'
			});*/
			$(".export0 a").attr("href","http://"+parent.$raise.domain+"/data/daily?json=1&start_date="+start_date+"&end_date="+end_date+"&type=0&export=1");
			
			$("#tbodyContent").html('');
			$("#tbodyContent").html(html);
			
			//分页
			$("#pagenation").html(result.pageHtml).ready(function(){
				
				$("#pagenation").children().children("a").on('click',function(){
					var index = $(this).text();
					$(".ser_load").html("<img src='../img/load.gif' />");
					$("#pagenation").children().children("a").removeClass("bg_c");
					$(this).addClass("bg_c");
					page_html(start_date,end_date,result,index);
					
					
					return false;
				});
			
			});
			//
			
			$("#cum_daliy .sum_date span").html( result.startTime+"  至  "+result.endTime);
			$("#cum_daliy ul li:eq(0) span").html( result.pagePersonTotal+"/"+result.allPersonTotal);
			$("#cum_daliy ul li:eq(1) span").html( result.pageChargeTotal+"/"+result.allChargeTotal);
			$("#cum_daliy ul li:eq(2) span").html( result.pageDealsTotal+"/"+result.allDealsTotal);
			$("#cum_daliy ul li:eq(3) span").html( result.pageYearDealsTotal+"/"+result.allYearDealsTotal);
			if($("#tbodyContent tr td").text()!==""){
				$(".user_data .no_data").hide();
				$("#pagenation li a:eq(0)").addClass("bg_c");
			};
		});
		
		return false;
	});

});
function a_lianj(id,startTime,endTime,name){
	window.location.href = '/data/all?pid='+id+'&start_date='+startTime+'&end_date='+endTime+'&sale_name='+name+'&type=0'
}

function page_html(starTdate,enDdate,Result,index){
	$.ajax({
		type:"GET",
		url:"http://"+parent.$raise.domain+"/data/daily?json=1&start_date="+starTdate+"&end_date="+enDdate+"&page="+index+'&type=0',
		dataType:"json",
		beforeSend:function(){
			$(".ser_load").css("display","block");
		},
		success:function(obj){
			console.log(obj);
			$(".ser_load").css("display","none");
			var html2;
			var userInfo = obj.userInfo;
			$.each(userInfo,function(k){
				html2 += '<tr onclick="a_lianj('+userInfo[k].sales_pid+','+'\''+obj.startTime+'\''+','+'\''+obj.endTime+'\''+','+'\''+userInfo[k].sales_real_name+'\')"><td>' + obj.startTime+"  -  "+obj.endTime
				+"</td>"+"<td>"+userInfo[k].sales_real_name
				+"</td>"+"<td>"+userInfo[k].sales_pid
				+"</td>"+'<td>'+userInfo[k].count
				+"</td>"+'<td>'+userInfo[k].totalAmount
				+"</td>"+'<td>'+userInfo[k].totalMoney
				+'</td>'+'<td>'+userInfo[k].yearTotalMoney
				+'</td></tr>'
			});
			$("#tbodyContent").html('');
			$("#tbodyContent").html(html2);
			
			$("#pagenation").html(obj.pageHtml).ready(function(){
				$("#pagenation a").on('click',function(){
					var start_date = $("#inpstart").val();
					var end_date = $("#inpend").val();
					var Result = new Object();
					Result.startTime = start_date;
					Result.endTime = end_date;
					var index = $(this).text();	
					page_html(start_date,end_date,Result,index);
					$(this).css({"background":"#ffb866","color":"white"});
					return false;
				});
				
				
			});
			
			$("#cum_daliy ul li:eq(0) span").html( obj.pagePersonTotal+"/"+obj.allPersonTotal);//注册人数
			$("#cum_daliy li:eq(1) span").html( obj.pageChargeTotal+"/"+obj.allChargeTotal);//充值金额
			$("#cum_daliy li:eq(2) span").html( obj.pageDealsTotal+"/"+obj.allDealsTotal);  //投资金额
			$("#cum_daliy li:eq(3) span").html( obj.pageYearDealsTotal+"/"+obj.allYearDealsTotal); //年化投资金额
			
			
		},
		error:function(){
			alert("系统错误");
			$(".ser_load").css("display","none");
		}
		
	});
};









































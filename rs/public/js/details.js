urlGetParams = {};
(function($) {
$.extend({       
urlGet:function()
{
    var aQuery = window.location.href.split("?");  //取得Get参数
    var aGET = new Array();
    if(aQuery.length > 1)
    {
        var aBuf = aQuery[1].split("&");
        for(var i=0, iLoop = aBuf.length; i<iLoop; i++)
        {
            var aTmp = aBuf[i].split("=");  //分离key与Value
            aGET[aTmp[0]] = aTmp[1];
        }
     }
     return aGET;
 }
})
})(jQuery);


$(function(){
	$(".ser_load").html("<img src='../img/load.gif' />");
	urlGetParams = $.urlGet();
	var registerurl = "/data/all?pid="+urlGetParams.pid+"&start_date="+urlGetParams.start_date+"&end_date="+urlGetParams.end_date+"&sale_name="+urlGetParams.sale_name+"&type=0&page=0&json=1";
	var Rechargeurl = "/data/all?pid="+urlGetParams.pid+"&start_date="+urlGetParams.start_date+"&end_date="+urlGetParams.end_date+"&sale_name="+urlGetParams.sale_name+"&type=1&page=0&json=1";
	var Investurl = "/data/all?pid="+urlGetParams.pid+"&start_date="+urlGetParams.start_date+"&end_date="+urlGetParams.end_date+"&sale_name="+urlGetParams.sale_name+"&type=2&page=0&json=1";
	//注册
	GetAddJson(registerurl);//加载完成后添加值
	//充值
	RechargeClick(Rechargeurl);
	//充值
	InvestClick(Investurl);
});

//===============注册==================

//注册加载完成后添加值
function GetAddJson(registerurl){
	$(".ser_load").show();
	$.getJSON(registerurl,function(result){
		console.log(result);
		$(".ser_load").hide();
		RegisterHtml(result);
		$("#export1").attr("href","http://"+parent.$raise.domain+"/data/all?json=1&pid="+urlGetParams.pid+"&start_date="+result.start_date+"&end_date="+result.end_date+"&sale_name="+urlGetParams.sale_name+"&type=0&export=1");
	});
}
//注册Html添加
function RegisterHtml(result){
	var registerInfoList = result.registerInfoList;
	var RegisterHtml = '';
	$.each(registerInfoList,function(i){
		RegisterHtml +='<tr><td>'+ registerInfoList[i].create_time
			+'</td><td id="active_1">'+registerInfoList[i].real_name_encrypt
			+'</td><td>'+registerInfoList[i].mobile
			+'</td><td>'+registerInfoList[i].idno_encrypt
			+'</td><td>'+result.sale_name
			+'</td></tr>'
	});
	$("#recharge_data").html(RegisterHtml);
	$(".no_data").hide();
	RegisterTotal(result);
	RegisterPageHtml(result);
}
//添加注册的总计
function RegisterTotal(result){
	$("#enrolment1 span").html(result.registerCount);
	$("#zongji1 span").html(result.start_date+" - "+result.end_date);
}
//添加注册的分页
function RegisterPageHtml(result){
	$("#pagenation_1").show().html(result.pageHtml);
	$("#pagenation_1 li a").on("click",function(){
		var Index = $(this).text();
		$(".ser_load").show();
		$.ajax({
			type:"get",
			url:"/data/all?pid="+urlGetParams.pid+"&start_date="+urlGetParams.start_date+"&end_date="+urlGetParams.end_date+"&sale_name="+urlGetParams.sale_name+"&json=1&type=0&page="+Index,
			dataType:"json",
			deforesend:function(){
				//$(".ser_load").show();
			},
			success:function(obj){
				//console.log(obj)
				$(".ser_load").hide();
				RegisterHtml(obj);//注册Html添加 
				RegisterTotal(obj);//添加注册的总计
				RegisterPageHtml(obj);//添加注册的分页
			},
			error:function(){
				alert("错误");
			}
		})
		return false;
	});
}


//===============充值==================
function RechargeClick(Rechargeurl){
	$("#recharge").on("click",function(){
		$(".ser_load").show();
		$.getJSON(Rechargeurl,function(result){
			console.log(result);
			$(".ser_load").hide();
			RechargeHtml(result);
			RechargePageHtml(result);
			$(".export2 a").attr("href","http://"+parent.$raise.domain+"/data/all?json=1&pid="+urlGetParams.pid+"&start_date="+result.start_date+"&end_date="+result.end_date+"&sale_name="+urlGetParams.sale_name+"&type=1&export=1");
		});
		
	});
}
//充值Html添加
function RechargeHtml(result){
	var rechargeInfoList = result.rechargeInfoList;
	var RechargeHtml = '';
	$.each(rechargeInfoList,function(i){
		RechargeHtml +='<tr><td>'+ rechargeInfoList[i].time
		+'</td><td class="active_1">'+rechargeInfoList[i].real_name_encrypt
		+'</td><td>'+rechargeInfoList[i].mobile
		+'</td><td>'+rechargeInfoList[i].idno_encrypt
		+'</td><td>'+rechargeInfoList[i].amount
		+'</td><td>'+result.sale_name
		+'</td></tr>'
	});
	$("#recharge_data2").html(RechargeHtml);
	$(".no_data").hide();
	RechargeTotal(result);
}
//充值注册的总计
function RechargeTotal(result){
	$("#enrolment2 span").html(result.pageChargeTotal+"/"+result.allChargeTotal);
	$("#zongji2 span").html(result.start_date+" - "+result.end_date);
}
//充值的分页
function RechargePageHtml(result){
	$("#pagenation_2").show().html(result.pageHtml);
	$("#pagenation_2 li a").on("click",function(){
		var Index = $(this).text();
		$(".ser_load").show();
		$.ajax({
			type:"get",
			url:"/data/all?pid="+urlGetParams.pid+"&start_date="+urlGetParams.start_date+"&end_date="+urlGetParams.end_date+"&sale_name="+urlGetParams.sale_name+"&json=1&type=1&page="+Index,
			dataType:"json",
			deforesend:function(){
				//$(".ser_load").show();
			},
			success:function(obj){
				//console.log(obj)
				$(".ser_load").hide();
				RechargeHtml(obj);//充值Html添加 
				RechargeTotal(obj);//添加充值的总计
				RechargePageHtml(obj);//添加充值的分页
			},
			error:function(){
				alert("错误");
			}
		})
		return false;
	});
}





//===============投资==================
function InvestClick(Investurl){
	$("#deals").on("click",function(){
		$(".ser_load").show();
		$.getJSON(Investurl,function(result){
			console.log(result);
			$(".ser_load").hide();
			InvestHtml(result);
			InvestPageHtml(result);
			$(".export3 a").attr("href","http://"+parent.$raise.domain+"/data/all?json=1&pid="+urlGetParams.pid+"&start_date="+result.start_date+"&end_date="+result.end_date+"&sale_name="+urlGetParams.sale_name+"&type=2&export=1");
		});
		
	});
}
//投资Html添加
function InvestHtml(result){
	var loadInfoList = result.loadInfoList;
	var InvestHtml = '';
	$.each(loadInfoList,function(i){
		InvestHtml += '<tr><td>'+loadInfoList[i].time
		+'</td><td>'+loadInfoList[i].real_name_encrypt
		+'</td><td>'+loadInfoList[i].mobile
		+'</td><td>'+loadInfoList[i].idno_encrypt
		+'</td><td>'+loadInfoList[i].money
		+'</td><td>'+loadInfoList[i].yearDealMoney
		+'</td><td>'+loadInfoList[i].pname
		+'</td><td>'+loadInfoList[i].ptime
		+'</td><td>'+loadInfoList[i].enddate
		+'</td><td>'+loadInfoList[i].earnings
		+'</td><td>'+result.sale_name
		+'</td></tr>'
	});
	$("#deals_data3").html(InvestHtml);
	$(".no_data").hide();
	InvestTotal(result);
}
//投资注册的总计
function InvestTotal(result){
	$("#enrolment3 span").html(result.pageDealsTotal+"/"+result.allDealsTotal);
	$("#zongji3 span").html(result.start_date+" - "+result.end_date);
}
//投资的分页
function InvestPageHtml(result){
	$("#pagenation_3").show().html(result.pageHtml);
	$("#pagenation_3 li a").on("click",function(){
		var Index = $(this).text();
		$(".ser_load").show();
		$.ajax({
			type:"get",
			url:"/data/all?pid="+urlGetParams.pid+"&start_date="+urlGetParams.start_date+"&end_date="+urlGetParams.end_date+"&sale_name="+urlGetParams.sale_name+"&json=1&type=2&page="+Index,
			dataType:"json",
			deforesend:function(){
				//$(".ser_load").show();
			},
			success:function(obj){
				//console.log(obj)
				$(".ser_load").hide();
				InvestHtml(obj);//充值Html添加 
				InvestTotal(obj);//添加充值的总计
				InvestPageHtml(obj);//添加充值的分页
			},
			error:function(){
				alert("错误");
			}
		})
		return false;
	});
}


























































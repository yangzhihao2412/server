$(document).ready(function(){
	$(".ser_load").html("<img src='../img/load.gif' />");
	$.getJSON("/raise/userdesc?json=1",function(resulterr){
		if(resulterr.role_id==3){
			$("#show_err").show();
			$(".delete_centent").html(resulterr.show_err).css({"color":"red","font-size":"18px"});
			}
	})
	$(".JsUserInfoSubmit").on("submit",function(){
		var  UserName = $("#JsUserName");
		var  PhoneNumber = $("#JsPhoneNumber");
		$(".ser_load").show();
		$(".ser_load").html("<img src='../img/load.gif' />");
		
			if($(PhoneNumber).val()==""){
					$(".verifyiphone").html("手机不能为空！").show();
				}else{
					if(!PhoneNumber.val().match(/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){10,11})+$/)){
						$(".verifyiphone").html("手机格式输入有误！").show();
					}else{
						var Mobile = $("#JsPhoneNumber").val();
						$.getJSON("/raise/userdesc?json=1&submit=1&type=0&mobile="+Mobile,function(result){
							//console.log(result)
							$(".ser_load").hide();
							if(result.code==102){
								alert(result.show_err)
							}else if(result.role_id){
								alert(result.show_err)
							}
							
							UserInfo(result);// 查询用户信息
							
							UserChargeInfo(result)//查询充值记录
							
							TabDataPage() //tab切换
							
							UserChargeInfo(result)//查询充值记录
							
							UserCarryInfo(result)//提现
							
							UserDealInfo(result)//投资
							
						})
					}
				
			
		}
		return false;
	});
	
});


//查询用户信息
function UserInfo(result){
	var userInfo = result.userInfo;
	$(".UserId").html(userInfo.id);  //用户id
	$(".UserRegisterDate").html(userInfo.create_time);  //用户注册时间
	$(".UserDataName").html(userInfo.user_name);  //用户名字
	$(".UserMobile").html(userInfo.mobile);  //用户手机号码
	$(".UserRecommended").html(userInfo.invite);  //推荐人
	$(".UserMoney").html(userInfo.baofooMoney+"元");  //用户金额	
}

//查询充值记录
function UserChargeInfo(result){
	var chargeInfo = result.chargeInfo;
	var ChargeHtml = '';
	var Condition = ["失败","成功"];
	$.each(chargeInfo, function(i) {
		ChargeHtml +='<tr><td class="DateTime">'+chargeInfo[i].create_time_z
					+'</td><td>'+chargeInfo[i].order_id
					+'</td><td class="hide">'+chargeInfo[i].create_time
					+'</td><td>'+chargeInfo[i].amount+"元"
					+'</td><td class="ColorCondition">'+Condition[chargeInfo[i].is_callback]
					+'</td><td>'+chargeInfo[i].code
					+'</td></tr>';
	});
	
	$("#JsTbodyRechargeRecord").html(ChargeHtml);
	ChargeDataPage(result)
	BaoFooParameter(result,"#JsTbodyRechargeRecord tr","0");
	
	$("#JsTbodyRechargeRecord tr td").each(function(){
		if($(this).html()=="undefined" || $(this).html()=="null" ){
			$(this).html("---")
		}
	})
	
}

//分页
function ChargeDataPage(result){
	$(".JJsTbodyRechargeRecordPage").html(result.pageHtml);
	$(".JJsTbodyRechargeRecordPage").children().children("a").on("click",function(){
		var index = $(this).text();
		var Name = $("#JsUserName").val();
		$(".ShowParameter").hide();
		var Mobile = $("#JsPhoneNumber").val();
		$(".ser_load").show();
		$.ajax({
			type:"get",
			url:"/raise/userdesc?json=1&submit=1&name="+Name+"&mobile="+Mobile+"&charge=1&type=0&page="+index,
			dataType:"json",
			success:function(page){
				$(".ser_load").hide();
				//console.log(page)
				UserChargeInfo(page);
				ChargeDataPage(page);
			},
			error:function(){
				alert("错误")
			}
		})
		return false;
	});
		
}

//tab切换
function TabDataPage(){
	$(".TabRechargeRecord ul li").on("click",function(){
		$(".TabRechargeRecord").children().children("li").removeClass("BorderBotton");
		$(".TabShow").children().children("dt").hide().eq($(this).index()).show();
		$(this).addClass("BorderBotton");
		var Name = $("#JsUserName").val();
		var Mobile = $("#JsPhoneNumber").val();
		if($(this).index()==1){
			if($("#JsTbodyCash").html()==""){
				$(".ser_load").show();
				$.getJSON("/raise/userdesc?json=1&submit=1&name="+Name+"&type=1&mobile="+Mobile,function(result){
					UserCarryInfo(result);
					
				})
			}
		}else if($(this).index()==2){
			if($(".JsTbodyInvesPage").html()==""){
				$(".ser_load").show();
				$.getJSON("/raise/userdesc?json=1&submit=1&name="+Name+"&type=2&mobile="+Mobile,function(result){
					UserDealInfo(result);
				})
			}
			
		}
	})
	
}
//提现
function UserCarryInfo(result){
		//console.log(result);
		$(".ser_load").hide();
		var carryInfo = result.carryInfo;
		var CarryHtml = '';
		var Condition = ["失败","成功"];
		$.each(carryInfo, function(i) {
			CarryHtml +='<tr><td>'+carryInfo[i].create_time_z
			+'</td><td>'+carryInfo[i].order_id
			+'</td><td class="hide">'+carryInfo[i].create_time
			+'</td><td>'+carryInfo[i].amount+"元"
			+'</td><td class="ColorCondition">'+Condition[carryInfo[i].is_callback]
			+'</td><td>'+carryInfo[i].code
			+'</td></tr>'
		});
		$("#JsTbodyCash").html(CarryHtml);
		CarryDataPage(result);
		BaoFooParameter(result,"#JsTbodyCash tr","1");
		
		
		$("#JsTbodyCash tr td").each(function(){
			if($(this).html()=="undefined" || $(this).html()=="null" ){
				$(this).html("---")
			}
		})
}

//分页
function CarryDataPage(result){
	$(".JsTbodyCashPage").html(result.pageHtml);
	$(".JsTbodyCashPage").children().children("a").on("click",function(){
		var index = $(this).text();
		$(".ShowParameter").hide();
		var Name = $("#JsUserName").val();
		var Mobile = $("#JsPhoneNumber").val();
		$(".ser_load").show();
		$.ajax({
			type:"get",
			url:"/raise/userdesc?json=1&submit=1&name="+Name+"&mobile="+Mobile+"&carry=1&type=1&page="+index,
			dataType:"json",
			success:function(page){
				$(".ser_load").hide();
				//console.log(page)
				UserCarryInfo(page);
				CarryDataPage(page);
			},
			error:function(){
				alert("错误")
			}
		})
		return false;
	});
		
}


//投资
function UserDealInfo(result){
		//console.log(result);
		$(".ser_load").hide();
		var dealInfo = result.dealInfo;
		var dealHtml = '';
		var Condition = ["等待材料","进行中","满标","流标","还款中","已还清"];
		$.each(dealInfo, function(i) {
			dealHtml +='<tr><td>'+dealInfo[i].create_time_z
			+'</td><td>'+dealInfo[i].deal_id
			+'</td><td class="hide">'+dealInfo[i].create_time
			+'</td><td>'+dealInfo[i].name
			+'</td><td>'+dealInfo[i].money
			+'</td><td>'+dealInfo[i].earnings
			+'</td><td class="deal_status">'+Condition[dealInfo[i].deal_status]
			+'</td></tr>'
		});
		$("#JsTbodyInvestment").html(dealHtml);
		DealDataPage(result);
		BaoFooParameter(result,"#JsTbodyInvestment tr","2");
		
		$("#JsTbodyInvestment tr td").each(function(){
			if($(this).html()=="undefined" || $(this).html()=="null" ){
				$(this).html("---")
			}
		})
}

//分页
function DealDataPage(result){
	$(".JsTbodyInvesPage").html(result.pageHtml);
	$(".JsTbodyInvesPage").children().children("a").on("click",function(){
		var index = $(this).text();
		$(".ShowParameter").hide();
		var Name = $("#JsUserName").val();
		var Mobile = $("#JsPhoneNumber").val();
		$(".ser_load").show();
		$.ajax({
			type:"get",
			url:"/raise/userdesc?json=1&submit=1&name="+Name+"&mobile="+Mobile+"&deal=1&type=2&page="+index,
			dataType:"json",
			success:function(obj){
				$(".ser_load").hide();
				console.log(obj)
				UserDealInfo(obj);
				DealDataPage(obj);
			},
			error:function(){
				alert("错误")
			}
		})
		return false;
	});
		
}



function BaoFooParameter(result,id,Shuzi){
	$(id).on("click",function(event){
		var index = $(this).index();
		var DateTime = $(this).children("td:eq(2)").text();
		var BaoFooId = $(this).children("td:eq(1)").text();
		var url = "/raise/userdesc?json=1&type="+Shuzi+"&baofoo=1&create_time="+DateTime+"&order_id="+BaoFooId;
		var x = $(this).offset().top;
		var y = $(this).offset().left;
		$(".ShowParameter").css({'display':"block",'top':x-60+"px",'left':y+4+"%"});
		$(".ShowParameter").html('<div class="CloseParameter f_r"><img src="../img/close.png" /></div><div class="BaoFooParameter ml_10 mt_5">宝付请求参数<p class="f12 mt_5 mb_5"></p></div><xmp class="ShowBaoFooParameter ml_10 f12 mt_10"></xmp>');
		$(".CloseParameter").on("click",function(){
			$(".ShowParameter").hide();
		});
		$(".ser_load").show();
		event.stopPropagation();
		$(".BaoFooParameter p").html("请求时间:"+DateTime).css("color","#b9c6de");
		$.ajax({
			type:"get",
			url:url,
			dataType:"json",
			deforesend:function(){
				$(".ser_load").show();
			},
			success:function(obj){
				//console.log(obj)
				$(".ser_load").hide();
				var baofoo_log_data = obj.baofoo_log_data;
				if(obj.code==0){
					$(".ShowBaoFooParameter").html(obj.baofoo_log_data)
				}else{
					$(".ShowBaoFooParameter").html(baofoo_log_data.strxml).css({"color":"#585858","white-space":"pre-wrap"});
				}
				$(document).on("click",function(){
					$(".ShowParameter").hide();
				})
				$(".ShowParameter").click(function(event){
					event.stopPropagation();
				});
			},
			error:function(){
				alert("错误");
			}
		})
	});
}























































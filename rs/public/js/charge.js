$(function(){
	$(".ser_load").show();
	$(".ser_load").html("<img src='../img/load.gif' />");
	$.getJSON("http://"+parent.$raise.domain+"/data/charge?json=1&group=1",function(result){
		if(result.code==200){
			$("#show_err").show();
			$(".delete_centent").html(result.show_err).css({"color":"red","font-size":"18px"});
			$(".But_f").hide();
		}
		//console.log(result)
		$(".ser_load").hide();
		
		
		var companyList = result.companyList;
		var companyHtml ='';
		$.each(companyList,function(i){
			companyHtml += '<p>'+companyList[i].company_name+'<span class="hide">'+companyList[i].id+'</span>'+'</p>';
		});
		$("#companyList").html(companyHtml);
		
		Dept(result);
		
		
		
		var teamList = result.teamList;
		var teamHtml ='';
		$.each(teamList,function(i){
			teamHtml += '<p>'+teamList[i].dept_name+'<span class="hide">'+teamList[i].id+'</span>'+'</p>';
		});
		$("#teamList").html(teamHtml);
		
		
		$(".ClickShow").on("click",function(){
			var index = $(this).parent().parent().parent().index()+1;
			$(".popupBg").show();
			
			if(index==1){
				ClickCompany(result);
			}else if(index == 2){
				ClickDept01(result);
				
			}else if(index == 3){
				//alert(1)
				$(".popupBg").hide();
				return false;
				//ClickTeam(result);
			}
			
		});
		com();
		
		ClickdeptList();
		
		
	});
	
});
function ClickDept01(result){
	$(".CompanyName").html('<label>分公司名称</label><br /><select class="f12 mt_10 allCompany" name="company"><option class="allCompanytHtml2" value="0">请选择公司</option></select><input class="f12 mt_10 mb_15 allDeptVal" type="text" name="dept" placeholder="输入部门名称" />');
	$(".ClickBut").html('<div class="cancelStyle">取消</div><button class="confirmStyle2">确定</button>');
	
	$(".cancelStyle").on("click",function(){
		$(".popupBg").hide();
	})
	AjaxDept(result);
	
}
//部门点击添加获取分公司列表
function AjaxDept(result){
	$(".ser_load").show();
	$.ajax({
		type:"get",
		url:"/data/charge?json=1&group=1",
		dataTyoe:"json",
		success:function(obj){
			obj = JSON.parse(obj);
			//console.log(obj)
			$(".ser_load").hide();
			var companyList = obj.companyList;
			var companyHtml ='';
			$.each(companyList,function(i){
				companyHtml += '<option class="teamRemov" value='+companyList[i].id+'>'+companyList[i].company_name+'</option>';
			});
			$(".allCompanytHtml2").after(companyHtml);
			AddDeptList();
		},
		error:function(){
			alert("错误");
		}
	})
}

//点击添加部门列表
function AddDeptList(){
	$(".confirmStyle2").on("click",function(){
		var CompanyId = $(".allCompany").val();
		var CompanyName = $(".allCompany option:selected").html();
		var DeptName = $(".allDeptVal").val();
		//alert(CompanyName)
		//return false;
		$(".ser_load").show();
		$.ajax({
			type:"get",
			url:"/data/charge?json=1&group=1&adddept=1&company_id="+CompanyId+"&companyName="+CompanyName+"&deptName="+DeptName+"&clickcompany=1&company="+CompanyId,
			dataTyoe:"json",
			success:function(obj){
				obj = JSON.parse(obj);
				$(".ser_load").hide();
				console.log(obj)
				var deptList = obj.deptList;
				var deptHtml ='';
				$.each(deptList,function(i){
					deptHtml += '<p>'+deptList[i].dept_name+'<span class="hide">'+deptList[i].id+'</span>'+'</p>';
				});
				$("#deptList").html(deptHtml);
				$(".popupBg").hide();
				if(obj.code==1){
					alert(obj.show_err)
				};
				ClickdeptList();
			},
			error:function(){
				alert("错误");
			}
		})
		return false;
	});
}


//click分公司
function com(){
	$("#companyList").children("p").on("click",function(){
		var index = $(this).children("span").text();
		$(".ser_load").show();
		$("#companyList p").removeClass("ClickBg");
		$(this).addClass("ClickBg");
		//alert(index)
		$.ajax({
			type:'get',
			url:"/data/charge?json=1&group=1&clickcompany=1&company="+index,
			dataType:"json",
			success:function(obj){
				$(".ser_load").hide();
				Dept(obj);
				ClickdeptList();
			},
			error:function(){
				alert("错误");
			}
		});
		return false;
	});
}
//添加部门列表
function Dept(result){
	var deptList = result.deptList;
	var deptHtml ='';
	$.each(deptList,function(i){
		deptHtml += '<p>'+deptList[i].dept_name+'<span class="hide">'+deptList[i].id+'</span>'+'</p>';
	});
	$("#deptList").html(deptHtml);
}

//点击部门显示团队列表
function ClickdeptList(){
	$("#deptList").children("p").click(function(){
		$(".ser_load").show();
		var index = $(this).children("span").text();
		$("#deptList p").removeClass("deptClickBg");
		$(this).addClass("deptClickBg");
		var comID = $("#companyList").children("p.ClickBg").children("span").text();
		//alert(index);
		$.ajax({
			type:'get',
			url:"/data/charge?json=1&group=1&clickcompany=1&company="+comID+"&clickdept=1&department="+index,
			dataType:"json",
			success:function(obj){
				$(".ser_load").hide();
				//console.log(obj)
				Team(obj)
			},
			error:function(){
				$(".ser_load").hide();
				alert("错误");
			}
		});
	});
}

//添加团队列表
function Team(result){
	var teamList = result.teamList;
	var teamHtml ='';
	$.each(teamList,function(i){
		teamHtml += '<p>'+teamList[i].team_name+'<span class="hide">'+teamList[i].id+'</span>'+'</p>';
	});
	$("#teamList").html(teamHtml);
}


function ClickCompany(result){
	$(".CompanyName").html('<label>分公司名称</label><br /><input class="allCompanyVal" class="f12 mt_10 mb_15" type="text" name="team" placeholder="输入分公司名称" />');
	$(".ClickBut").html('<div class="cancelStyle">取消</div><button class="confirmStyle1">确定</button>');
	$(".cancelStyle").on("click",function(){
		$(".popupBg").hide();
	});
	$(".confirmStyle1").click(function(){
		$(".ser_load").show();
		var allCompanyVal = $(".allCompanyVal").val();
		$.ajax({
			type:'get',
			url:"http://"+parent.$raise.domain+"/data/charge?json=1&group=1&addcompany=1&companyName="+allCompanyVal,
			dataType:'json',
			success:function(obj){
				console.log(obj)
				$(".ser_load").hide();
				var companyList = obj.companyList;
				var companyHtml ='';
				$.each(companyList,function(i){
					companyHtml += '<p>'+companyList[i].company_name+'<span class="hide">'+companyList[i].id+'</span>'+'</p>';
				});
				$("#companyList").html(companyHtml);
				
				$(".popupBg").hide();
				if(obj.code==1){
					alert(obj.show_err)
					
				}else if(obj.code==103){
					alert(obj.show_err)
				};
				com();
				
			},
			error:function(){
				alert("错误");
			}
		})
		return false;
	});
	
}



function ClickTeam(result){
	$(".CompanyName").html('<label>分公司名称</label><br /><select class="f12 mt_10 allCompany" name="company"><option class="allCompanytHtml3" value="0">请选择分公司</option></select><label>部门名称</label><br /><select class="f12 mt_10 allDept" name="dept"><option class="allDeptHtml" value="0">请选择部门</option></select><label>团队名称</label><br /><input class="f12 mt_10 mb_15 allteamVal" type="text" name="team" placeholder="输入团队名称" />');
	$(".ClickBut").html('<div class="cancelStyle">取消</div><button class="confirmStyle3">确定</button>');
	
	
	var companyList = result.companyList;
	var companyHtml ='';
	$.each(companyList,function(i){
		companyHtml += '<option class="teamRemov" value='+companyList[i].id+'>'+companyList[i].company_name+'</option>';
	});
	$(".allCompanytHtml3").after(companyHtml);
	
	$(".allCompany").change(function(){
		var allCompanyId = $(this).val();
		$.ajax({
			type:"get",
			url:"http://"+parent.$raise.domain+"/data/charge?json=1&group=1&clickcompany=1&company="+allCompanyId,
			dataType:"json",
			success:function(obj){
				//console.log(obj)
				var deptList = obj.deptList;
				var deptHtml ='';
				$.each(deptList,function(i){
					deptHtml += '<option class="teamRemov" value='+deptList[i].id+'>'+deptList[i].dept_name+'</option>';
					
				});
				$(".allDept .teamRemov").remove();
				$(".allDeptHtml").after(deptHtml);
			},
			error:function(){
				alert("错误");
			}
		});
	});
	$(".confirmStyle3").click(function(){
		 //Addteam(result);//添加团队
		return false;
	});
	
	
	$(".cancelStyle").on("click",function(){
		$(".popupBg").hide();
	});
}

//添加团队
function Addteam(result){
	var allCompanyId = $(".allCompany").val();
	var allDept = $(".allDept").val();
	var allteamVal = $(".allteamVal").val();
	$.ajax({
		type:'get',
		url:"http://"+parent.$raise.domain+"/data/charge?json=1&group=1&adddept=1&company_id="+allCompanyId+"&dept_id="+allDept+"&teamName"+allteamVal,
		dataType:'json',
		success:function(obj){
			//console.log(obj);
			var teamList = obj.teamList;
			var teamHtml ='';
			$.each(teamList,function(i){
				teamHtml += '<p>'+teamList[i].dept_name+'<span class="hide">'+teamList[i].id+'</span>'+'</p>';
			});
			$("#teamList").html(teamHtml);
			$(".popupBg").hide();
			if(obj.code==1){
				alert(obj.show_err)
				
			};
		},
		error:function(){
			alert("错误");
		}
	})
}
























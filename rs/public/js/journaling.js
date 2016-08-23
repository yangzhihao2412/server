//报表

var loadurl = "/data/daily?user=1&json=1&type=0";
$.getJSON(loadurl,function(result){
	var rss_user = result.rss_user;
	var role_id =rss_user.role_id;
	$(".ser_load").html("<img src='../img/load.gif' />");
	console.log(result)
	
	CompanyObtain(rss_user);//获取用户所在的分公司
	DepaObtain(rss_user)//获取用户所在的部门
	
	//日报查询数据
	$("#JsformData-daily").on("submit",function(){
		if($("#inpstart").val()==""){
			alert("请选择开始日期")
		}else if($("#inpend").val()==""){
			alert("请选择结束日期")
		}else{
			var groupId = $("#select-group").val();
			var companyId = $("#select-company").val();
			var depaId = $("#select-depa").val();
			var startTime = $("#inpstart").val();
			var endTime = $("#inpend").val();
			$(".ser_load").show();
			//alert(groupId+"---"+companyId+"---"+depaId+"---"+startTime+"---"+endTime+"---"+role_id)
			
			var dataUrl = "/data/daily?json=1&role_id="+role_id+"&type=0&start_date="+startTime+"&end_date="+endTime+"&group="+groupId+"&company="+companyId+"&dept="+depaId+"&team=0";
			
			DataSubmit(result,dataUrl,"#tbodyContent","#pagenation_daily",11,"#tbodyContent tr td.jiequ",".daily_date",".daily01",".daily02",".daily03",".daily04")//查询数据
			
			Export(".export0 a",dataUrl)//导出
			
		}
		return false
	});
	//月报查询数据
	$("#JsformData-monthiy").on("submit",function(){
		var groupId = $("#select-group").val();
		var companyId = $("#select-company").val();
		var depaId = $("#select-depa").val();
		var startTime = $("#custom1").val();
		$(".ser_load").show();
		
		var dataUrl = "/data/daily?json=1&role_id="+role_id+"&type=1&month_date="+startTime+"&group="+groupId+"&company="+companyId+"&dept="+depaId+"&team=0";
		
		DataSubmit(result,dataUrl,"#tbodyContent_month","#pagenation_month",11,"#tbodyContent_month tr td.jiequ",".daily_date_month",".daily01_month",".daily02_month",".daily03_month",".daily04_month")//查询数据    
		
		Export(".export1 a",dataUrl)//导出
		
		return false
	});
	//季报查询数据
	$("#JsformData-season").on("submit",function(){
		if($("#year").val()==""){
			alert("请选择日期")
		}else if($("#quarterly").val()==""){
			alert("请选择季度")
		}else{
			var groupId = $("#select-group").val();
			var companyId = $("#select-company").val();
			var depaId = $("#select-depa").val();
			var startTime = $("#year").val();
			var endTime = $("#quarterly").val();
			$(".ser_load").show();
			
			var dataUrl = "/data/daily?json=1&role_id="+role_id+"&type=2&year="+startTime+"&quarterly="+endTime+"&group="+groupId+"&company="+companyId+"&dept="+depaId+"&team=0";
			
			DataSubmit(result,dataUrl,"#tbodyContent_season","#pagenation_season",11,"#tbodyContent_season tr td.jiequ",".daily_date_season",".daily01_season",".daily02_season",".daily03_season",".daily04_season")//查询数据
			
			Export(".export2 a",dataUrl)//导出
			
		}
		return false
	});
	//年报查询数据
	$("#JsformData-year").on("submit",function(){
		var groupId = $("#select-group").val();
		var companyId = $("#select-company").val();
		var depaId = $("#select-depa").val();
		var startTime = $("#year_b").val();
		$(".ser_load").show();
		
		var dataUrl = "/data/daily?json=1&role_id="+role_id+"&type=3&year="+startTime+"&group="+groupId+"&company="+companyId+"&dept="+depaId+"&team=0";
		
		DataSubmit(result,dataUrl,"#tbodyContent_year","#pagenation_year",11,"#tbodyContent_year tr td.jiequ",".daily_date_year",".daily01_year",".daily02_year",".daily03_year",".daily04_year")//查询数据    
		
		Export(".export3 a",dataUrl)//导出
		
		return false
	});
});

//查询数据
function DataSubmit(result,dataUrl,htmlId,pageHtmlId,length,tbodyTd,daily_date,daily01,daily02,daily03,daily04){
	$.ajax({
		type:"get",
		url:dataUrl,
		dataType:"json",
		success:function(obj){
			$(".ser_load").hide();
			console.log(obj);
			if(obj.code==0){
				alert(obj.show_err)
			}else{
				zongji(obj,htmlId,length,tbodyTd,daily_date,daily01,daily02,daily03,daily04);
				pagehtml(obj,dataUrl,pageHtmlId,htmlId,length,tbodyTd,daily_date,daily01,daily02,daily03,daily04);
				if($(htmlId).children("tr").children("td").text()!==""){
					$(".user_data .no_data").hide();
				};
			}
			
		},
		error:function(){
			alert("错误");
		}
	})
}



//添加HTML数据
function zongji(mold,htmlId,length,tbodyTd,daily_date,daily01,daily02,daily03,daily04){
	var userInfo = mold.userInfo;
	var addHtml = '';
	$.each(userInfo,function(i){
		addHtml += '<tr onclick="a_lianj('+userInfo[i].sales_pid+','+'\''+mold.startTime+'\''+','+'\''+mold.endTime+'\''+','+'\''+userInfo[i].sales_real_name+'\')"><td class="jiequ">' + mold.startTime+"  -  "+mold.endTime
		+"</td>"+"<td>"+userInfo[i].sales_real_name
		+"</td>"+"<td>"+userInfo[i].sales_pid
		+"</td>"+'<td>'+userInfo[i].count
		+"</td>"+'<td>'+userInfo[i].totalAmount
		+"</td>"+'<td>'+userInfo[i].totalMoney
		+'</td>'+'<td>'+userInfo[i].yearTotalMoney
		+'</td></tr>'
	});
	$(htmlId).html('');
	$(htmlId).html(addHtml);
	j_length(length,tbodyTd)
	//总计人数
	$(daily_date).html( mold.startTime+"  至  "+mold.endTime);
	$(daily01).html( mold.pagePersonTotal+"/"+mold.allPersonTotal);
	$(daily02).html( mold.pageChargeTotal+"/"+mold.allChargeTotal);
	$(daily03).html( mold.pageDealsTotal+"/"+mold.allDealsTotal);
	$(daily04).html( mold.pageYearDealsTotal+"/"+mold.allYearDealsTotal);
}

//获取分页
function pagehtml(obj,dataUrl,pageHtmlId,htmlId,length,tbodyTd,daily_date,daily01,daily02,daily03,daily04){
	$(pageHtmlId).html(obj.pageHtml);
	$(pageHtmlId).children("li").on("click",function(){
		var index = $(this).text();
		$(".ser_load").show();
		$.ajax({
			type:"get",
			url:dataUrl+"&page="+index,
			dataType:"json",
			success:function(obj){
				$(".ser_load").hide();
				zongji(obj,htmlId,length,tbodyTd,daily_date,daily01,daily02,daily03,daily04);
				pagehtml(obj,dataUrl,pageHtmlId,htmlId,length,tbodyTd,daily_date,daily01,daily02,daily03,daily04);
			},
			error:function(){
				alert("错误");
			}
		});
		return false
	});
}


//获取用户所在的分公司
function CompanyObtain(rss_user){
	$("#select-group").on("change",function(){
		$(".ser_load").show();
		var group_id = $("#select-group").val();
		var role_id =rss_user.role_id;
		var CompanyUrl = "/data/daily?json=1&role_id="+role_id+"&org=1&type=0&group="+group_id;
		$.ajax({
			type:"get",
			url:CompanyUrl,
			dataType:"json",
			success:function(obj){
				$(".ser_load").hide();
				var companyList = obj.dept.companyList
				var addhtml = "";
				//console.log(companyList)
				$.each(companyList,function(i){
					addhtml +='<option value="'+companyList[i].id+'">'+companyList[i].company_name+'</option>'
				})
				$("#select-company").html('<option id="CompanyDefault" value="0">请选择</option>');
				$("#CompanyDefault").after(addhtml);
			},
			error:function(){
				alert("错误");
			}
		})
	})
}


//获取用户所在的部门
function DepaObtain(rss_user){
	$("#select-company").on("change",function(){
		$(".ser_load").show();
		var group_id = $("#select-group").val();
		var company_id = $("#select-company").val();
		var role_id =rss_user.role_id;
		var DepaUrl = "/data/daily?json=1&role_id="+role_id+"&org=1&type=0&group="+group_id+"&clickcompany=1&company="+company_id;
		$.ajax({
			type:"get",
			url:DepaUrl,
			dataType:"json",
			success:function(obj){
				$(".ser_load").hide();
				var deptList = obj.dept.deptList
				var addhtml = "";
				console.log(deptList)
				$.each(deptList,function(i){
					addhtml +='<option value="'+deptList[i].id+'">'+deptList[i].dept_name+'</option>'
				})
				$("#select-depa").html('<option id="DepaDefault" value="0">请选择</option>');
				$("#DepaDefault").after(addhtml);
			},
			error:function(){
				alert("错误");
			}
		})
	})
}


/*&clickdept=1&department=3                    获取团队链接*/



//截取月报，季报，年报的时间
function j_length(length,tbodyTd){
	var dateLength = $(tbodyTd).text();
	if(dateLength.length>length){
		$(tbodyTd).text(dateLength.substr(0,length)); 
	};
	
}

//导出
function Export(ExportId,dataUrl){
	$(ExportId).attr("href",dataUrl+"&export=1");
}

//点击详情链接
function a_lianj(id,startTime,endTime,name){
	window.location.href = '/data/all?pid='+id+'&start_date='+startTime+'&end_date='+endTime+'&sale_name='+name+'&type=0'
}

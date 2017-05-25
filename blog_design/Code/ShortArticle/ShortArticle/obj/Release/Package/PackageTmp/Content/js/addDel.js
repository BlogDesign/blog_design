$(document).ready(function () {
 // 增加，删除内容组
    /*
    .js-group--addDel是内容组
    .js-groupBtn--add是增加按钮
    .js-groupBtn--del是增加按钮
    .js-groupBtn--delAll是删除全部按钮
    */
    var htmlGroup_py = "";
	    htmlGroup_py += '<div class="row">';
	    htmlGroup_py += '<div class="p-btn--close">';
	    htmlGroup_py += '<button type="button" class="close js-groupBtn--del">&times;</button>';
	    htmlGroup_py += '</div>';
	    htmlGroup_py += '<div class="col-lg-3 col-sm-6">';
	    htmlGroup_py += '<div class="form-group">';
	    htmlGroup_py += '<label for="DrugName" class="control-label col-sm-4">药品</label>';
	    htmlGroup_py += '<div class="col-sm-8">';
	    htmlGroup_py += '<input id="DrugName" name="DrugNameList" type="text" value="111111111111" class="form-control">';
	    htmlGroup_py += '</div>';
	    htmlGroup_py += '</div>';
	    htmlGroup_py += '</div>';
	    htmlGroup_py += '<div class="col-lg-3 col-sm-6">';
	    htmlGroup_py += '<div class="form-group">';
	    htmlGroup_py += '<label for="Dose" class="control-label col-sm-4">剂量</label>';
	    htmlGroup_py += '<div class="col-sm-8">';
	    htmlGroup_py += '<input id="Dose" name="DoseList" type="text" class="form-control">';
	    htmlGroup_py += '</div>';
	    htmlGroup_py += '</div>';
	    htmlGroup_py += '</div>';
	    htmlGroup_py += '<div class="col-lg-3 col-sm-6">';
	    htmlGroup_py += '<div class="form-group">';
	    htmlGroup_py += '<label for="Usage" class="control-label col-sm-4">用法</label>';
	    htmlGroup_py += '<div class="col-sm-8">';
	    htmlGroup_py += '<input id="Usage" name="UsageList" type="text" class="form-control">';
	    htmlGroup_py += '</div>';
	    htmlGroup_py += '</div>';
	    htmlGroup_py += '</div>';
	    htmlGroup_py += '<div class="col-lg-3 col-sm-6">';
	    htmlGroup_py += '<div class="form-group">';
	    htmlGroup_py += '<label for="DispenseAmount" class="control-label col-sm-4">发药数量</label>';
	    htmlGroup_py += '<div class="col-sm-8">';
	    htmlGroup_py += '<input id="DispenseAmount" name="DispenseAmountList" type="text" class="form-control">';
	    htmlGroup_py += '</div>';
	    htmlGroup_py += '</div>';
	    htmlGroup_py += '</div>';
	    htmlGroup_py += '</div>';

    var htmlGroup_bznr1 = '<div class="row">'
			+ '<div class="p-btn--close">'
				+ '<button type="button" class="close js-groupBtn--del">&times;</button>'
			+ '</div>'
			+ '<div class="col-sm-12">'
				+ '<div class="form-group">'
					+ '<label for="RemarkContent" class="control-label col-sm-2 col-lg-1">备注</label>'
					+ '<div class="col-sm-10 col-lg-11">'
						+ '<textarea name="logConsultation.RemarkContentlist" id="RemarkContent" cols="30" rows="5" class="form-control"></textarea>'
					+ '</div>'
				+ '</div>'
			+ '</div>'
		+ '</div>';
    var htmlGroup_bznr2 = '<div class="row">'
			+ '<div class="p-btn--close">'
				+ '<button type="button" class="close js-groupBtn--del">&times;</button>'
			+ '</div>'
			+ '<div class="col-sm-12">'
				+ '<div class="form-group">'
					+ '<label for="RemarkContent" class="control-label col-sm-2 col-lg-1">备注</label>'
					+ '<div class="col-sm-10 col-lg-11">'
						+ '<textarea name="checkLog.RemarkContentlist" id="RemarkContent" cols="30" rows="5" class="form-control"></textarea>'
					+ '</div>'
				+ '</div>'
			+ '</div>'
		+ '</div>';
    var htmlGroup_bznr3 = '<div class="row">'
			+ '<div class="p-btn--close">'
				+ '<button type="button" class="close js-groupBtn--del">&times;</button>'
			+ '</div>'
			+ '<div class="col-sm-12">'
				+ '<div class="form-group">'
					+ '<label for="RemarkContent" class="control-label col-sm-2 col-lg-1">备注</label>'
					+ '<div class="col-sm-10 col-lg-11">'
						+ '<textarea name="medicalLog.RemarkContentlist" id="RemarkContent" cols="30" rows="5" class="form-control"></textarea>'
					+ '</div>'
				+ '</div>'
			+ '</div>'
		+ '</div>';
    var htmlGroup_bznr4 = '<div class="row">'
			+ '<div class="p-btn--close">'
				+ '<button type="button" class="close js-groupBtn--del">&times;</button>'
			+ '</div>'
			+ '<div class="col-sm-12">'
				+ '<div class="form-group">'
					+ '<label for="RemarkContent" class="control-label col-sm-2 col-lg-1">备注</label>'
					+ '<div class="col-sm-10 col-lg-11">'
						+ '<textarea name="hospitalLog.RemarkContentlist" id="RemarkContent" cols="30" rows="5" class="form-control"></textarea>'
					+ '</div>'
				+ '</div>'
			+ '</div>'
		+ '</div>';
    var htmlGroup_fj = '<div class="row">'
			+ '<div class="col-sm-12">'
				+ '<div class="form-group">'
					+ '<label for="fj" class="control-label col-sm-2 col-lg-1">附件</label>'
					+ '<div class="col-sm-10 col-lg-11">'
						+ '<input id="fj" type="file" class="form-control">'
					+ '</div>'
				+ '</div>'
			+ '</div>'
		+ '</div>';
    var htmlGroup_ss = '<div class="row">'
						+ '<div class="p-btn--close">'
							+ '<button type="button" class="close js-groupBtn--del">&times;</button>'
						+ '</div>'
						+ '<div class="col-lg-3 col-sm-6">'
							+ '<div class="form-group">'
								+ '<label for="SurgeryName" class="control-label col-sm-4">手术名称</label>'
								+ '<div class="col-sm-8">'
									+ '<input id="SurgeryName" name="SurgeryNameList" type="text" class="form-control">'
								+ '</div>'
							+ '</div>'
						+ '</div>'
						+ '<div class="col-lg-3 col-sm-6">'
							+ '<div class="form-group">'
								+ '<label for="Surgeon" class="control-label col-sm-4">主刀医生</label>'
								+ '<div class="col-sm-8">'
									+ '<input id="Surgeon" name="SurgeonList" type="text" class="form-control">'
								+ '</div>'
							+ '</div>'
						+ '</div>'
						+ '<div class="col-lg-6 col-sm-6">'
							+ '<div class="form-group">'
								+ '<label for="SurgeryBeginDate" class="control-label col-sm-4 col-lg-2">手术起止时间</label>'
                                + '<label for="SurgeryEndDate" class="control-label col-sm-4 col-lg-2 sr-only"></label>'
								+ '<div class="col-sm-8 col-lg-10">'
									+ '<div class="input-group  c-input-group--span">'
										+ '<input id="SurgeryBeginDate" name="SurgeryBeginDateList" type="text" class="form-control" onclick="WdatePicker({dateFmt:' + "'yyyy-MM-dd HH:mm'" + '})" readonly=true>'
										+ '<span class="input-group-addon">至</span>'
										+ '<input id="SurgeryEndDate" name="SurgeryEndDateList" type="text" class="form-control" onclick="WdatePicker({dateFmt:' + "'yyyy-MM-dd HH:mm'" + '})" readonly=true>'
									+ '</div>'
								+ '</div>'
							+ '</div>'
						+ '</div>'
						+ '<div class="col-lg-3 col-sm-6">'
							+ '<div class="form-group">'
								+ '<label for="SurgeryContinuedTime" class="control-label col-sm-4">手术持续时间</label>'
								+ '<div class="col-sm-8">'
									+ '<input id="SurgeryContinuedTime" name="SurgeryContinuedTimeList" type="text" class="form-control">'
								+ '</div>'
							+ '</div>'
						+ '</div>'
						+ '<div class="col-lg-3 col-sm-6">'
							+ '<div class="form-group">'
								+ '<label for="AssistantOne" class="control-label col-sm-4">第一助手</label>'
								+ '<div class="col-sm-8">'
									+ '<input id="AssistantOne" name="AssistantOneList" type="text" class="form-control">'
								+ '</div>'
							+ '</div>'
						+ '</div>'
						+ '<div class="col-lg-3 col-sm-6">'
							+ '<div class="form-group">'
								+ '<label for="AssistantTwo" class="control-label col-sm-4">第二助手</label>'
								+ '<div class="col-sm-8">'
									+ '<input id="AssistantTwo" name="AssistantTwoList" type="text" class="form-control">'
								+ '</div>'
							+ '</div>'
						+ '</div>'
						+ '<div class="col-lg-3 col-sm-6">'
							+ '<div class="form-group">'
								+ '<label for="Anesthesia" class="control-label col-sm-4">麻醉方式</label>'
								+ '<div class="col-sm-8">'
									+ '<input id="Anesthesia" name="AnesthesiaList" type="text" class="form-control">'
								+ '</div>'
							+ '</div>'
						+ '</div>'
						+ '<div class="col-lg-3 col-sm-6">'
							+ '<div class="form-group">'
								+ '<label for="AnesthesiaPersonnel" class="control-label col-sm-4">麻醉人员</label>'
								+ '<div class="col-sm-8">'
									+ '<input id="AnesthesiaPersonnel" name="AnesthesiaPersonnelList" type="text" class="form-control">'
								+ '</div>'
							+ '</div>'
						+ '</div>'
						+ '<div class="col-lg-3 col-sm-6">'
							+ '<div class="form-group">'
								+ '<label for="PreoperativeDiagnosis" class="control-label col-sm-4">术前诊断</label>'
								+ '<div class="col-sm-8">'
									+ '<input id="PreoperativeDiagnosis" name="PreoperativeDiagnosisList" type="text" class="form-control">'
								+ '</div>'
							+ '</div>'
						+ '</div>'
						+ '<div class="col-lg-3 col-sm-6">'
							+ '<div class="form-group">'
								+ '<label for="PostoperativeDiagnosis" class="control-label col-sm-4">术后诊断</label>'
								+ '<div class="col-sm-8">'
									+ '<input id="PostoperativeDiagnosis" name="PostoperativeDiagnosisList" type="text" class="form-control">'
								+ '</div>'
							+ '</div>'
						+ '</div>'
						+ '<div class="col-lg-3 col-sm-6">'
							+ '<div class="form-group">'
								+ '<label for="AfterSurgery" class="control-label col-sm-4">手术经过</label>'
								+ '<div class="col-sm-8">'
									+ '<input id="AfterSurgery" name="AfterSurgeryList" type="text" class="form-control">'
								+ '</div>'
							+ '</div>'
						+ '</div>'
					+ '</div>';
    var htmlGroup_fwxi = '<div class="row">'
							+ '<div class="p-btn--close">'
								+ '<button type="button" class="close js-groupBtn--del">×</button>'
							+ '</div>'
							+ '<div class="col-lg-3 col-sm-6">'
								+ '<div class="form-group">'
									+ '<label for="ExpertFees" class="control-label col-sm-4">专家费</label>'
									+ '<div class="col-sm-8">'
										+ '<select id="ExpertFees" name="LogConsultationDetail.ExpertFeesList" class="form-control" onclick="AddOption(this)"  onblur="RetMoney()" >'
										+ '</select>'
									+ '</div>'
								+ '</div>'
							+ '</div>'
							+ '<div class="col-lg-3 col-sm-6">'
								+ '<div class="form-group">'
									+ '<label for="Departments" class="control-label col-sm-4">就诊科室</label>'
										+ '<div class="col-sm-8">'
										+ '<select id="Departments" name="LogConsultationDetail.DepartmentsList" class="form-control">'
											+ '@Html.Partial("_SelectDepartmentList")'
										+ '</select>'
									+ '</div>'
								+ '</div>'
							+ '</div>'
							+ '<div class="col-lg-3 col-sm-6">'
								+ '<div class="form-group">'
									+ '<label for="ClinicDoctorName" class="control-label col-sm-4">就诊医生</label>'
									+ '<div class="col-sm-8">'
										+ '<select id="ClinicDoctorName" name="LogConsultationDetail.ClinicDoctorNameList" class="form-control">'
											+ '@Html.Partial("_SelectExpertList")'
										+ '</select>'
									+ '</div>'
								+ '</div>'
							+ '</div>'
							+ '<div class="col-sm-12">'
								+ '<div class="form-group">'
									+ '<label for="Symptoms" class="control-label col-lg-1 col-sm-2">现有不适症状</label>'
									+ '<div class="col-lg-11 col-sm-10">'
										+ '<textarea name="LogConsultationDetail.SymptomsList" id="Symptoms" cols="30" rows="5" class="form-control"></textarea>'
									+ '</div>'
								+ '</div>'
							+ '</div>'
							+ '<div class="col-sm-12">'
								+ '<div class="form-group">'
									+ '<label for="Diagnosis" class="control-label col-lg-1 col-sm-2">诊断</label>'
									+ '<div class="col-lg-11 col-sm-10">'
										+ '<textarea name="LogConsultationDetail.DiagnosisList" id="Diagnosis" cols="30" rows="5" class="form-control"></textarea>'
									+ '</div>'
								+ '</div>'
							+ '</div>'
							+ '<div class="col-sm-12">'
								+ '<div class="form-group">'
									+ '<label for="TreatmentPrograms" class="control-label col-lg-1 col-sm-2">治疗方案</label>'
									+ '<div class="col-lg-11 col-sm-10">'
										+ '<textarea name="LogConsultationDetail.TreatmentProgramsList" id="TreatmentPrograms" cols="30" rows="5" class="form-control"></textarea>'
									+ '</div>'
								+ '</div>'
							+ '</div>'
						+ '</div>';
	var htmlGroup_bmjl = '<div class="row">'
							+'<div class="p-btn--close">'
								+'<button type="button" class="close js-groupBtn--del">&times;</button>'
							+'</div>'
							+'<div class="col-sm-12">'
								+'<div class="form-group">'
									+'<label for="bz1" class="control-label col-sm-2 col-lg-1">责任部门处理意见及回复客户内容</label>'
									+'<div class="col-sm-10 col-lg-11">'
										+'<textarea name="" id="aa" cols="30" rows="5" class="form-control"></textarea>'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<div class="col-sm-12">'
								+'<div class="form-group">'
									+'<label for="bz1" class="control-label col-sm-2 col-lg-1">客户沟通反馈内容</label>'
									+'<div class="col-sm-10 col-lg-11">'
										+'<textarea name="" id="bb" cols="30" rows="5" class="form-control"></textarea>'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<div class="col-lg-3 col-sm-6">'
								+'<div class="form-group">'
									+'<label for="" class="control-label col-sm-4">责任部门反馈时间</label>'
									+'<div class="col-sm-8">'
										+'<input id="cc" type="text" class="form-control">'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<div class="col-lg-3 col-sm-6">'
								+'<div class="form-group">'
									+'<label for="" class="control-label col-sm-4">是否总经办介入</label>'
									+'<div class="col-sm-8">'
										+'<select name="" id="dd" class="form-control">'
											+'<option value="">是</option>'
											+'<option value="">否</option>'
										+'</select>'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<div class="col-lg-3 col-sm-6">'
								+'<div class="form-group">'
									+'<label for="" class="control-label col-sm-4">确认客户反馈时间</label>'
									+'<div class="col-sm-8">'
										+'<input id="ee" type="text" class="form-control">'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<div class="col-lg-3 col-sm-6">'
								+'<div class="form-group">'
									+'<label for="" class="control-label col-sm-4">结束时间</label>'
									+'<div class="col-sm-8">'
										+'<input id="ff" type="text" class="form-control">'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<div class="col-lg-3 col-sm-6">'
								+'<div class="form-group">'
									+'<label for="" class="control-label col-sm-4">服务工号</label>'
									+'<div class="col-sm-8">'
										+'<input id="gg" type="text" class="form-control">'
										+'</div>'
								+'</div>'
							+'</div>'
							+'<div class="col-lg-3 col-sm-6">'
								+'<div class="form-group">'
									+'<label for="" class="control-label col-sm-4">满意度</label>'
									+'<div class="col-sm-8">'
										+'<input id="hh" type="text" class="form-control">'
									+'</div>'
								+'</div>'
							+'</div>'
						+'</div>';
	var htmlGroup_jlcl = '<div class="row">'
							+'<div class="p-btn--close">'
								+'<button type="button" class="close js-groupBtn--del">&times;</button>'
							+'</div>'
							+'<div class="col-sm-12">'
								+'<div class="form-group">'
									+'<label for="" class="control-label col-sm-2 col-lg-1">经理处理意见</label>'
									+'<div class="col-sm-10 col-lg-11">'
										+'<textarea name="" id="aa" cols="30" rows="5" class="form-control"></textarea>'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<div class="col-lg-3 col-sm-6">'
								+'<div class="form-group">'
									+'<label for="" class="control-label col-sm-4">结束时间</label>'
									+'<div class="col-sm-8">'
										+'<input id="bb" type="text" class="form-control">'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<div class="col-lg-3 col-sm-6">'
								+'<div class="form-group">'
									+'<label for="" class="control-label col-sm-4">服务工号</label>'
									+'<div class="col-sm-8">'
										+'<input id="cc" type="text" class="form-control">'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<div class="col-lg-3 col-sm-6">'
								+'<div class="form-group">'
									+'<label for="" class="control-label col-sm-4">满意度</label>'
									+'<div class="col-sm-8">'
										+'<input id="dd" type="text" class="form-control">'
									+'</div>'
								+'</div>'
							+'</div>'
						+'</div>';
	var htmlGroup_khywzx = '<div class="row">'
								+'<div class="p-btn--close">'
									+'<button type="button" class="close js-groupBtn--del">×</button>'
								+'</div>'
								+'<div class="col-lg-3 col-sm-6">'
									+'<div class="form-group">'
										+'<label for="a" class="control-label col-sm-4">会员卡号</label>'
										+'<div class="col-sm-8">'
											+'<input id="a" type="text" class="form-control">'
										+'</div>'
									+'</div>'
								+'</div>'
								+'<div class="col-lg-3 col-sm-6">'
									+'<div class="form-group">'
										+'<label for="b" class="col-sm-4 control-label">服务时间</label>'
										+'<label for="c" class="sr-only">结束时间</label>'
										+'<div class="col-sm-8">'
										  +'<div class="input-group c-input-group--span">'
										  	+'<input id="b" type="text" class="form-control">'
										  	+'<span class="input-group-addon">至</span>'
										  	+'<input id="c" type="text" class="form-control">'
										  +'</div>'
										+'</div>'
									+'</div>'
								+'</div>'
								+'<div class="col-lg-3 col-sm-6">'
									+'<div class="form-group">'
										+'<label for="d" class="control-label col-sm-4">服务套餐</label>'
										+'<div class="col-sm-8">'
											+'<select name="" id="d" class="form-control">'
												+'<option value="">1</option>'
												+'<option value="">2</option>'
												+'<option value="">3</option>'
											+'</select>'
										+'</div>'
									+'</div>'
								+'</div>'
								+'<div class="col-lg-3 col-sm-6">'
									+'<div class="form-group">'
										+'<label for="e" class="control-label col-sm-4">服务内容</label>'
										+'<div class="col-sm-8">'
											+'<select name="" id="e" class="form-control">'
												+'<option value="">业务咨询</option>'
												+'<option value="">服务预约</option>'
												+'<option value="">投诉申告</option>'
											+'</select>'
										+'</div>'
									+'</div>'
								+'</div>'
							+'</div>';
	var htmlGroup_zxnr = '<div class="row">'
							+'<div class="p-btn--close">'
								+'<button type="button" class="close js-groupBtn--del">×</button>'
							+'</div>'
							+'<div class="col-lg-3 col-sm-6">'
								+'<div class="form-group">'
									+'<label for="" class="control-label col-sm-4">咨询性质</label>'
									+'<div class="col-sm-8">'
										+'<select name="" id="" class="form-control">'
											+'<option value="">个人</option>'
											+'<option value="">家庭</option>'
											+'<option value="">企业</option>'
										+'</select>'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<div class="col-lg-3 col-sm-6">'
								+'<div class="form-group">'
									+'<label for="" class="control-label col-sm-4">咨询时间</label>'
									+'<div class="col-sm-8">'
										+'<select class="form-control">'
											+'<option value="">请选择</option>'
										+'</select>'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<div class="col-lg-3 col-sm-6">'
								+'<div class="form-group">'
									+'<label for="" class="control-label col-sm-4">处理方式</label>'
									+'<div class="col-sm-8">'
										+'<select class="form-control">'
											+'<option value="">请选择</option>'
											+'<option value="">现场答复</option>'
											+'<option value="">定期答复</option>'
										+'</select>'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<div class="col-lg-6 col-sm-12">'
								+'<div class="form-group">'
									+'<label for="" class="control-label col-lg-2 col-sm-2">咨询内容</label>'
									+'<div class="col-lg-10 col-sm-10">'
										+'<label for="" class="checkbox-inline"><input type="checkbox" name="" id="">公司情况</label>'
										+'<label for="" class="checkbox-inline"><input type="checkbox" name="" id="">产品内容</label>'
										+'<label for="" class="checkbox-inline"><input type="checkbox" name="" id="">产品价格</label>'
										+'<label for="" class="checkbox-inline"><input type="checkbox" name="" id="">服务流程</label>'
										+'<label for="" class="checkbox-inline"><input type="checkbox" name="" id="">其他</label>'
									+'</div>'
								+'</div>'
							+'</div>'
						+'</div>';
	var htmlGroup_bznr5 = '<div class="row">'
						+ '<div class="p-btn--close">'
							+ '<button type="button" class="close js-groupBtn--del">&times;</button>'
						+ '</div>'
						+ '<div class="col-sm-12">'
							+ '<div class="form-group">'
								+ '<label for="bznr" class="control-label col-sm-2 col-lg-1">备注</label>'
								+ '<div class="col-sm-10 col-lg-11">'
									+ '<textarea name="" id="bznr" cols="30" rows="5" class="form-control"></textarea>'
								+ '</div>'
							+ '</div>'
						+ '</div>'
					+ '</div>';
	var htmlGroup_dsdf = '<div class="row">'
							+'<div class="p-btn--close">'
								+'<button type="button" class="close js-groupBtn--del">&times;</button>'
							+'</div>'
							+'<div class="col-sm-12">'
								+'<div class="form-group">'
									+'<label for="bz1" class="control-label col-sm-2 col-lg-1">具体内容</label>'
									+'<div class="col-sm-10 col-lg-11">'
										+'<textarea name="" id="bz1" cols="30" rows="5" class="form-control"></textarea>'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<div class="col-lg-3 col-sm-6">'
								+'<div class="form-group">'
									+'<label for="" class="control-label col-sm-4">答复客户时间</label>'
									+'<div class="col-sm-8">'
										+'<select name="" id="" class="form-control">'
											+'<option value="">请选择</option>'
										+'</select>'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<div class="col-lg-3 col-sm-6">'
								+'<div class="form-group">'
									+'<label for="" class="control-label col-sm-4">服务工号</label>'
									+'<div class="col-sm-8">'
										+'<input id="" type="text" class="form-control">'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<div class="col-lg-3 col-sm-6">'
								+'<div class="form-group">'
									+'<label for="" class="control-label col-sm-4">满意度</label>'
									+'<div class="col-sm-8">'
										+'<input id="" type="text" class="form-control">'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<div class="col-sm-12">'
								+'<div class="form-group">'
									+'<label for="bz1" class="control-label col-sm-2 col-lg-1">答复客户内容</label>'
									+'<div class="col-sm-10 col-lg-11">'
										+'<textarea name="" id="bz1" cols="30" rows="5" class="form-control"></textarea>'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<div class="col-lg-3 col-sm-6">'
								+'<div class="form-group">'
									+'<label for="" class="control-label col-sm-4">答复客户时间</label>'
									+'<div class="col-sm-8">'
										+'<input id="" type="text" class="form-control">'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<div class="col-lg-3 col-sm-6">'
								+'<div class="form-group">'
									+'<label for="" class="control-label col-sm-4">服务工号</label>'
									+'<div class="col-sm-8">'
										+'<input id="" type="text" class="form-control">'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<div class="col-lg-3 col-sm-6">'
								+'<div class="form-group">'
									+'<label for="" class="control-label col-sm-4">满意度</label>'
									+'<div class="col-sm-8">'
										+'<input id="" type="text" class="form-control">'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<div class="col-sm-12">'
								+'<div class="form-group">'
									+'<label for="bz1" class="control-label col-sm-2 col-lg-1">备注</label>'
									+'<div class="col-sm-10 col-lg-11">'
										+'<textarea name="" id="bz1" cols="30" rows="5" class="form-control"></textarea>'
									+'</div>'
								+'</div>'
							+'</div>'
						+'</div>';
	var htmlGroup_ywzx = '<div class="row">'
							+'<div class="p-btn--close">'
								+'<button type="button" class="close js-groupBtn--del">&times;</button>'
							+'</div>'
							+'<div class="col-lg-3 col-sm-6">'
								+'<div class="form-group">'
									+'<label for="" class="control-label col-sm-4">咨询性质</label>'
									+'<div class="col-sm-8">'
									+'<select name="" id="" class="form-control">'
											+'<option value="">请选择</option>'
											+'<option value="">个人</option>'
											+'<option value="">家庭</option>'
											+'<option value="">企业</option>'
										+'</select>'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<div class="col-lg-3 col-sm-6">'
								+'<div class="form-group">'
									+'<label for="" class="control-label col-sm-4">了解途径</label>'
									+'<div class="col-sm-8">'
										+'<select name="" id="" class="form-control">'
											+'<option value="">请选择</option>'
											+'<option value="">朋友介绍</option>'
											+'<option value="">互联网</option>'
											+'<option value="">报刊书籍</option>'
											+'<option value="">社交活动</option>'
										+'</select>'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<div class="col-lg-6 col-sm-12">'
								+'<div class="form-group">'
									+'<label for="" class="control-label col-sm-2">咨询内容</label>'
									+'<div class="col-sm-10">'
										+'<label for="" class="checkbox-inline"><input type="checkbox" name="" id="">公司情况</label>'
										+'<label for="" class="checkbox-inline"><input type="checkbox" name="" id="">产品内容</label>'
										+'<label for="" class="checkbox-inline"><input type="checkbox" name="" id="">服务流程</label>'
										+'<label for="" class="checkbox-inline"><input type="checkbox" name="" id="">价格</label>'
										+'<label for="" class="checkbox-inline"><input type="checkbox" name="" id="">其他</label>'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<div class="col-sm-12">'
								+'<div class="form-group">'
									+'<label for="" class="control-label col-sm-2 col-lg-1">具体内容</label>'
									+'<div class="col-sm-10 col-lg-11">'
										+'<textarea name="" id="" cols="30" rows="5" class="form-control"></textarea>'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<div class="col-sm-12">'
								+'<div class="form-group">'
									+'<label for="" class="control-label col-sm-2 col-lg-1">答复客户内容</label>'
									+'<div class="col-sm-10 col-lg-11">'
										+'<textarea name="" id="" cols="30" rows="5" class="form-control"></textarea>'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<div class="col-lg-3 col-sm-6">'
								+'<div class="form-group">'
									+'<label for="" class="control-label col-sm-4">反馈客户时间</label>'
									+'<div class="col-sm-8">'
										+'<select name="" id="" class="form-control">'
											+'<option value="">请选择</option>'
										+'</select>'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<div class="col-lg-3 col-sm-6">'
								+'<div class="form-group">'
									+'<label for="" class="control-label col-sm-4">服务工号</label>'
									+'<div class="col-sm-8">'
										+'<input type="text" class="form-control">'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<div class="col-lg-3 col-sm-6">'
								+'<div class="form-group">'
									+'<label for="" class="control-label col-sm-4">满意度</label>'
									+'<div class="col-sm-8">'
										+'<input type="text" class="form-control">'
									+'</div>'
								+'</div>'
							+'</div>'
							+'<div class="col-sm-12">'
								+'<div class="form-group">'
									+'<label for="" class="control-label col-sm-2 col-lg-1">备注事项</label>'
									+'<div class="col-sm-10 col-lg-11">'
										+'<textarea name="" id="" cols="30" rows="5" class="form-control"></textarea>'
									+'</div>'
								+'</div>'
							+'</div>'
						+'</div>';
	// 开药品
	var htmlGroup_ky = '<div class="row js-prescription-group">'
						+'<div class="p-btn--close">'
							+'<button type="button" class="close js-groupBtn--del">×</button>'
						+'</div>'
						+'<div class="col-sm-6 col-lg-3">'
							+'<div class="form-group">'
								+'<label for="" class="control-label col-sm-4">药品名称</label>'
								+'<div class="col-sm-8">'
									+'<input type="text" class="form-control" id="ypmc">'
								+'</div>'
							+'</div>'
						+'</div>'
						+'<div class="col-sm-6 col-lg-3">'
							+'<div class="form-group">'
								+'<label for="" class="control-label col-sm-4">每次剂量</label>'
								+'<div class="col-sm-8">'
									+'<div class="input-group">'
										+'<input type="text" class="form-control">'
										+'<span class="input-group-addon">单位</span>'
									+'</div>'
								+'</div>'
							+'</div>'
						+'</div>'
						+'<div class="col-sm-6 col-lg-3">'
							+'<div class="form-group">'
								+'<label for="" class="control-label col-sm-4">用法</label>'
								+'<div class="col-sm-8">'
									+'<input type="text" class="form-control">'
								+'</div>'
							+'</div>'
						+'</div>'
						+'<div class="col-sm-6 col-lg-3">'
							+'<div class="form-group">'
								+'<label for="" class="control-label col-sm-4">用药频次</label>'
								+'<div class="col-sm-8">'
									+'<select name="" id="" class="form-control">'
										+'<option value="">请选择</option>'
										+'<option value="">1</option>'
										+'<option value="">2</option>'
										+'<option value="">3</option>'
									+'</select>'
								+'</div>'
							+'</div>'
						+'</div>'
						+'<div class="col-sm-6 col-lg-3">'
							+'<div class="form-group">'
								+'<label for="" class="control-label col-sm-4">天数</label>'
								+'<div class="col-sm-8">'
									+'<input type="text" class="form-control">'
								+'</div>'
							+'</div>'
						+'</div>'
						+'<div class="col-sm-6 col-lg-3">'
							+'<div class="form-group">'
								+'<label for="" class="control-label col-sm-4">注射次数</label>'
								+'<div class="col-sm-8">'
									+'<input type="text" class="form-control">'
								+'</div>'
							+'</div>'
						+'</div>'
						+'<div class="col-sm-6 col-lg-3">'
							+'<div class="form-group">'
								+'<label for="" class="control-label col-sm-4">发药数量</label>'
								+'<div class="col-sm-8">'
									+'<div class="input-group">'
										+'<input type="text" class="form-control">'
										+'<span class="input-group-addon">单位</span>'
									+'</div>'
								+'</div>'
							+'</div>'
						+'</div>'
					+'</div>';
    // alert(htmlGroup_fj);
    function groupAdd(btn) {
        var $group_addDel = btn.closest(".js-group--addDel");
        var group_addDel_data = $group_addDel.attr('data-groupAddDel');

        var htmlGroup_row = $group_addDel.find(".row:first").clone(true);
        var $group_addDel_header = $group_addDel.find(".c-box_header");
        if (group_addDel_data == "htmlGroup_py") {
            $(htmlGroup_py).insertAfter($group_addDel_header)
				.find(':text').val("").end()
				.hide().slideDown();

        };
        if (group_addDel_data == "htmlGroup_bznr1") {
            $(htmlGroup_bznr1).insertAfter($group_addDel_header)
				.find(':text').val("").end()
				.hide().slideDown();
        };
        if (group_addDel_data == "htmlGroup_bznr2") {
            $(htmlGroup_bznr2).insertAfter($group_addDel_header)
				.find(':text').val("").end()
				.hide().slideDown();
        };
        if (group_addDel_data == "htmlGroup_bznr3") {
            $(htmlGroup_bznr3).insertAfter($group_addDel_header)
				.find(':text').val("").end()
				.hide().slideDown();
        };
        if (group_addDel_data == "htmlGroup_bznr4") {
            $(htmlGroup_bznr4).insertAfter($group_addDel_header)
				.find(':text').val("").end()
				.hide().slideDown();
        };
        if (group_addDel_data == "htmlGroup_fj") {
            $(htmlGroup_fj).insertAfter($group_addDel_header)
				.find(':text').val("").end()
				.hide().slideDown();
        };
        if (group_addDel_data == "htmlGroup_ss") {
            $(htmlGroup_ss).insertAfter($group_addDel_header)
				.find(':text').val("").end()
				.hide().slideDown();
        };
        if (group_addDel_data == "htmlGroup_fwxi") {
            $(htmlGroup_fwxi).insertAfter($group_addDel_header)
			.find(':text').val("").end()
			.hide().slideDown();

                 //-----------专家费用数据克隆-----------
                var TempExpertFees = $("#ExpertFees1").clone();
                $("#ExpertFees").html(TempExpertFees.html()).find("option").removeAttr('selected');
                alert(TempExpertFees.html());
                //-----------科室数据数据克隆-----------
                var TempDepartments = $("#Departments1").clone();
                $("#Departments").html(TempDepartments.html()).find("option").removeAttr('selected');
                alert(TempDepartments.html());
                //-----------就诊医生数据克隆-----------
                var TempClinicDoctorName = $("#ClinicDoctorName1").clone();
                $("#ClinicDoctorName").html(TempClinicDoctorName.html()).find("option").removeAttr('selected');
                alert(TempClinicDoctorName.html());

        };
        if (group_addDel_data == "htmlGroup_bmjl") {
            $(htmlGroup_bmjl).insertAfter($group_addDel_header)
				.find(':text').val("").end()
				.hide().slideDown();
        };
        if (group_addDel_data == "htmlGroup_jlcl") {
            $(htmlGroup_jlcl).insertAfter($group_addDel_header)
				.find(':text').val("").end()
				.hide().slideDown();
        };
        if (group_addDel_data == "htmlGroup_khywzx") {
            $(htmlGroup_khywzx).insertAfter($group_addDel_header)
				.find(':text').val("").end()
				.hide().slideDown();
        };
        if (group_addDel_data == "htmlGroup_zxnr") {
            $(htmlGroup_zxnr).insertAfter($group_addDel_header)
				.find(':text').val("").end()
				.hide().slideDown();
        };
        if (group_addDel_data == "htmlGroup_bznr5") {
            $(htmlGroup_bznr5).insertAfter($group_addDel_header)
				.find(':text').val("").end()
				.hide().slideDown();
        };
        if (group_addDel_data == "htmlGroup_dsdf") {
            $(htmlGroup_dsdf).insertAfter($group_addDel_header)
				.find(':text').val("").end()
				.hide().slideDown();
        };
        if (group_addDel_data == "htmlGroup_ywzx") {
            $(htmlGroup_ywzx).insertAfter($group_addDel_header)
				.find(':text').val("").end()
				.hide().slideDown();
        };
        // 开药品
        if (group_addDel_data == "htmlGroup_ky") {
            $(htmlGroup_ky).insertAfter($group_addDel_header)
				.find(':text').val("").end()
				.hide().slideDown();
        };
    }
    var len1 = $(htmlGroup_py).find(":input").not(":button").not("[type='hidden']").size();
    var arr1 = [];
    for (var index = 0; index < len1; index++) {
        arr1[index] = $(htmlGroup_py).find(":input").not(":button").not("[type='hidden']").eq(index).attr("id");
    }
    var len_bz1 = $(htmlGroup_bznr1).find(":input").not(":button").not("[type='hidden']").size();
    var arr_bz1 = [];
    for (var index = 0; index < len_bz1; index++) {
        arr_bz1[index] = $(htmlGroup_bznr1).find(":input").not(":button").not("[type='hidden']").eq(index).attr("id");
    }
    var len_bz2 = $(htmlGroup_bznr2).find(":input").not(":button").not("[type='hidden']").size();
    var arr_bz2 = [];
    for (var index = 0; index < len_bz2; index++) {
        arr_bz2[index] = $(htmlGroup_bznr2).find(":input").not(":button").not("[type='hidden']").eq(index).attr("id");
    }
    var len_bz3 = $(htmlGroup_bznr3).find(":input").not(":button").not("[type='hidden']").size();
    var arr_bz3 = [];
    for (var index = 0; index < len_bz3; index++) {
        arr_bz3[index] = $(htmlGroup_bznr3).find(":input").not(":button").not("[type='hidden']").eq(index).attr("id");
    }
    var len_bz4 = $(htmlGroup_bznr4).find(":input").not(":button").not("[type='hidden']").size();
    var arr_bz4 = [];
    for (var index = 0; index < len_bz4; index++) {
        arr_bz4[index] = $(htmlGroup_bznr4).find(":input").not(":button").not("[type='hidden']").eq(index).attr("id");
    }
    var len3 = $(htmlGroup_fj).find(":input").not(":button").not("[type='hidden']").size();
    var arr3 = [];
    for (var index = 0; index < len3; index++) {
        arr3[index] = $(htmlGroup_fj).find(":input").not(":button").not("[type='hidden']").eq(index).attr("id");
    }
    var len4 = $(htmlGroup_ss).find(":input").not(":button").not("[type='hidden']").size();
    var arr4 = [];
    for (var index = 0; index < len4; index++) {
        arr4[index] = $(htmlGroup_ss).find(":input").not(":button").not("[type='hidden']").eq(index).attr("id");
    }
    var len5 = $(htmlGroup_fwxi).find(":input").not(":button").not("[type='hidden']").size();
    var arr5 = [];
    for (var index = 0; index < len5; index++) {
        arr5[index] = $(htmlGroup_fwxi).find(":input").not(":button").not("[type='hidden']").eq(index).attr("id");
    }
    var len6 = $(htmlGroup_bmjl).find(":input").not(":button").not("[type='hidden']").size();
    var arr6 = [];
    for (var index = 0; index < len6; index++) {
        arr6[index] = $(htmlGroup_bmjl).find(":input").not(":button").not("[type='hidden']").eq(index).attr("id");
    }
    var len7 = $(htmlGroup_jlcl).find(":input").not(":button").not("[type='hidden']").size();
    var arr7 = [];
    for (var index = 0; index < len7; index++) {
        arr7[index] = $(htmlGroup_jlcl).find(":input").not(":button").not("[type='hidden']").eq(index).attr("id");
    }
    var len8 = $(htmlGroup_khywzx).find(":input").not(":button").not("[type='hidden']").size();
    var arr8 = [];
    for (var index = 0; index < len8; index++) {
        arr8[index] = $(htmlGroup_khywzx).find(":input").not(":button").not("[type='hidden']").eq(index).attr("id");
    }
    var len9 = $(htmlGroup_zxnr).find(":input").not(":button").not("[type='hidden']").size();
    var arr9 = [];
    for (var index = 0; index < len9; index++) {
        arr9[index] = $(htmlGroup_zxnr).find(":input").not(":button").not("[type='hidden']").eq(index).attr("id");
    }
    var len10 = $(htmlGroup_bznr5).find(":input").not(":button").not("[type='hidden']").size();
    var arr10 = [];
    for (var index = 0; index < len10; index++) {
        arr10[index] = $(htmlGroup_bznr5).find(":input").not(":button").not("[type='hidden']").eq(index).attr("id");
    }
    var len11 = $(htmlGroup_dsdf).find(":input").not(":button").not("[type='hidden']").size();
    var arr11 = [];
    for (var index = 0; index < len11; index++) {
        arr11[index] = $(htmlGroup_dsdf).find(":input").not(":button").not("[type='hidden']").eq(index).attr("id");
    }
    var len12 = $(htmlGroup_ywzx).find(":input").not(":button").not("[type='hidden']").size();
    var arr12 = [];
    for (var index = 0; index < len12; index++) {
        arr12[index] = $(htmlGroup_ywzx).find(":input").not(":button").not("[type='hidden']").eq(index).attr("id");
    }
    var len13 = $(htmlGroup_ky).find(":input").not(":button").not("[type='hidden']").size();
    var arr13 = [];
    for (var index = 0; index < len13; index++) {
        arr13[index] = $(htmlGroup_ky).find(":input").not(":button").not("[type='hidden']").eq(index).attr("id");
    }
// alert(len7);
    function fun_attr(group_addDel) {
        var group_addDel_data = group_addDel.attr('data-groupAddDel');

        group_addDel.find(".row").each(function () {
            var $this = $(this);
            var $input = $this.find(':input').not(':button').not("[type='hidden']");
            var $label = $this.find('label');
            var label_size = $label.size();
            var input_size = $input.size();
            var num_add = $this.prevAll(".row").size() + 1;

            var input_attr = [];
            for (var i = 0; i < input_size; i++) {
                input_attr[i] = $input.eq(i);
            }
            var label_attr = [];
            for (var i = 0; i < label_size; i++) {
                label_attr[i] = $label.eq(i);
            }

            if (group_addDel_data == "htmlGroup_py") {
                for (var i = 0; i < input_size; i++) {
                    var id_add = arr1[i] + num_add;
                    input_attr[i].attr('id', id_add);
                    label_attr[i].attr('for', id_add);
                }
            };
            if (group_addDel_data == "htmlGroup_bznr1") {
                for (var i = 0; i < input_size; i++) {
                    var id_add = arr_bz1[i] + num_add;
                    input_attr[i].attr('id', id_add);
                    label_attr[i].attr('for', id_add);
                }
            };
            if (group_addDel_data == "htmlGroup_bznr2") {
                for (var i = 0; i < input_size; i++) {
                    var id_add = arr_bz2[i] + num_add;
                    input_attr[i].attr('id', id_add);
                    label_attr[i].attr('for', id_add);
                }
            };
            if (group_addDel_data == "htmlGroup_bznr3") {
                for (var i = 0; i < input_size; i++) {
                    var id_add = arr_bz3[i] + num_add;
                    input_attr[i].attr('id', id_add);
                    label_attr[i].attr('for', id_add);
                }
            };
            if (group_addDel_data == "htmlGroup_bznr4") {
                for (var i = 0; i < input_size; i++) {
                    var id_add = arr_bz4[i] + num_add;
                    input_attr[i].attr('id', id_add);
                    label_attr[i].attr('for', id_add);
                }
            };
            if (group_addDel_data == "htmlGroup_fj") {
                for (var i = 0; i < input_size; i++) {
                    var id_add = arr3[i] + num_add;
                    input_attr[i].attr('id', id_add);
                    label_attr[i].attr('for', id_add);
                }
            };
            if (group_addDel_data == "htmlGroup_ss") {
                for (var i = 0; i < input_size; i++) {
                    var id_add = arr4[i] + num_add;
                    input_attr[i].attr('id', id_add);
                    label_attr[i].attr('for', id_add);
                }
            };
            if (group_addDel_data == "htmlGroup_fwxi") {
                for (var i = 0; i < input_size; i++) {
                    // alert(id_add);
                    var id_add = arr5[i] + num_add;
                    input_attr[i].attr('id', id_add);
                    label_attr[i].attr('for', id_add);
                }
            };
            if (group_addDel_data == "htmlGroup_bmjl") {
                for (var i = 0; i < input_size; i++) {
                    var id_add = arr6[i] + num_add;
                    input_attr[i].attr('id', id_add);
                    label_attr[i].attr('for', id_add);
                }
            };
            if (group_addDel_data == "htmlGroup_jlcl") {
                for (var i = 0; i < input_size; i++) {
                    var id_add = arr7[i] + num_add;

                    input_attr[i].attr('id', id_add);
                    label_attr[i].attr('for', id_add);
                }
            };
            if (group_addDel_data == "htmlGroup_khywzx") {
                for (var i = 0; i < input_size; i++) {
                    var id_add = arr8[i] + num_add;

                    input_attr[i].attr('id', id_add);
                    label_attr[i].attr('for', id_add);
                }
            };
            if (group_addDel_data == "htmlGroup_zxnr") {
                for (var i = 0; i < input_size; i++) {
                    var id_add = arr9[i] + num_add;

                    input_attr[i].attr('id', id_add);
                    label_attr[i].attr('for', id_add);
                }
            };
            if (group_addDel_data == "htmlGroup_bznr5") {
                for (var i = 0; i < input_size; i++) {
                    var id_add = arr10[i] + num_add;

                    input_attr[i].attr('id', id_add);
                    label_attr[i].attr('for', id_add);
                }
            };
            if (group_addDel_data == "htmlGroup_dsdf") {
                for (var i = 0; i < input_size; i++) {
                    var id_add = arr11[i] + num_add;

                    input_attr[i].attr('id', id_add);
                    label_attr[i].attr('for', id_add);
                }
            };
            if (group_addDel_data == "htmlGroup_ywzx") {
                for (var i = 0; i < input_size; i++) {
                    var id_add = arr12[i] + num_add;

                    input_attr[i].attr('id', id_add);
                    label_attr[i].attr('for', id_add);
                }
            };
            if (group_addDel_data == "htmlGroup_ky") {
                for (var i = 0; i < input_size; i++) {
                    var id_add = arr13[i] + num_add;

                    input_attr[i].attr('id', id_add);
                    label_attr[i].attr('for', id_add);
                }
            };
        });
    }

    $(".js-groupBtn--add").click(function () {
        var $thisBtn = $(this);
        var groupAddDel = $thisBtn.closest(".js-group--addDel");
        groupAdd($thisBtn);

        fun_attr(groupAddDel);
    });
    $(".js-groupBtn--del").live('click', function () {
        var $thisBtn = $(this);
        var groupAddDel = $(this).closest(".js-group--addDel");
        var itemLength = $thisBtn.closest(".js-group--addDel").find('.row').length;
        var $group_addDel_item = $thisBtn.closest(".row");
        if (!confirm("确认删除该项？")) {
            window.event.returnValue = false;
            return true;
        }
        if (itemLength == 1) {
            groupAdd($thisBtn);
            $group_addDel_item.detach();
            fun_attr(groupAddDel);
            return true;
        };
        $group_addDel_item.detach();
        fun_attr(groupAddDel);
    });
    $(".js-groupBtn--delAll").click(function () {
        var $thisBtn = $(this);
        var groupAddDel = $thisBtn.closest(".js-group--addDel");
        var $group_addDel_items = $thisBtn.closest(".js-group--addDel").find(".row");
        if (!confirm("确认删除所有项？")) {
            window.event.returnValue = false;
            return true;
        }
        $($group_addDel_items).detach();
        groupAdd($thisBtn);
        fun_attr(groupAddDel);
    });

    // 服务预约-预约表 增加删除项
    var htmlGroup_ddkszj = '<div class="row">'
					  		+'<div class="col-lg-3 col-sm-6">'
					  			+'<div class="form-group">'
					  				+'<label for="" class="control-label col-sm-4">地点1</label>'
					  				+'<div class="col-sm-8">'
					  					+'<select id="didian" name="appointmentDetail.Location" class="form-control">'
                                                +'<option>请选择</option>'
                                              +'  <option>浙一医院</option>'
					  					+'</select>'
					  				+'</div>'
					  			+'</div>'
					  		+'</div>'
					  		+'<div class="col-lg-3 col-sm-6">'
					  			+'<div class="form-group">'
					  				+'<label for="" class="control-label col-sm-4">科室1</label>'
					  				+'<div class="col-sm-8">'
					  					+'<select id="keshi" name="appointmentDetail.SubLocation" class="form-control">'
					  	                    +'<option>请选择</option>'
                                                +'<option>科室1</option>'
					  					+'</select>'
					  					+'</div>'
					  			+'</div>'
					  		+'</div>'
					  		+'<div class="col-lg-3 col-sm-6">'
					  			+'<div class="form-group">'
					  				+'<label for="" class="control-label col-sm-4">专家1</label>'
					  				+'<div class="col-sm-8">'
					  					+'<select id="zhuanjia" name="appointmentDetail.AppointmentPeople" class="form-control">'
					  	                    +'<option>请选择</option>'
                                                +'<option>专家1</option>'
					  					+'</select>'
					  				+'</div>'
					  			+'</div>'
					  		+'</div>'
					  		+'<div class="col-lg-3 col-sm-6">'
					  			+'<div class="btn-group">'
					  				+'<button type="button" class="btn btn-default js-p-add"><i class="glyphicon glyphicon-plus"></i></button>'
					  				+'<button type="button" class="btn btn-default js-p-del"><i class="glyphicon glyphicon-trash"></i></button>'
					  			+'</div>'
					  		+'</div>'
					  	+'</div>';
    function id_change(){
    	var $rows = $(".js-group--addDel").find(".row");
    	// alert($rows.length);
    	$rows.each(function(){
    	 	var id_Num = $(this).nextAll(".row").size()+1;
    	 	var id_New = $(htmlGroup_ddkszj).find(":input").attr("id")+id_Num;
    	 	// alert(id_Num);
    	 	$(this).find(":input").not(":button").attr('id',id_New);
    	 });
    }
	function p_btnAdd(btn){
		// var row_first = btn.closest(".js-group--addDel").find(".row:first");
		var row_this = btn.closest(".row");
		// var row_add = row_first.clone('true');
		// var row_add = $(htmlGroup_ddkszj);
		$(htmlGroup_ddkszj).insertAfter(row_this).find("option").removeAttr('selected');
		id_change();
	}
	function p_btnDel(btn){
		// var row_first = btn.closest(".js-group--addDel").find(".row:first");
		// var row_add = row_first.clone('true');
		var row_Del = btn.closest(".row");
		var row_size = btn.closest(".js-group--addDel").find(".row").size();
		if (row_size==1) {
			$(htmlGroup_ddkszj).insertAfter(row_Del).find("option").removeAttr('selected');
			row_Del.detach();
			return true;
		};
		row_Del.detach();
	}
    $(".js-p-add").live('click',function () {
    	var $thisBtn = $(this);
    	p_btnAdd($thisBtn);
    });
    $(".js-p-del").live('click',function () {
    	var $thisBtn = $(this);
    	p_btnDel($thisBtn);
    });

});





























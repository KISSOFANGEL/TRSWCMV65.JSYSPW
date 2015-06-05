function Date_getWeekStartDate() {
	var now = new Date();
	var nowDayOfWeek = now.getDay();
	var nowDay = now.getDate();
	var nowMonth = now.getMonth();
	var nowYear = now.getYear();
	nowYear += (nowYear < 2000) ? 1900 : 0;
	
	var nDiffDay = (nowDay - nowDayOfWeek);
	var nDay = (nowDay - nowDayOfWeek);
	var nMonth = (nowMonth+1);
	if(nDiffDay<=0){
		nMonth--;
		nDay = Date_getMonthMaxDay(nowYear, nMonth) + nDiffDay;
	}
	return nowYear + "-" + nMonth + "-" + nDay;
}

function Date_getWeekEndDate() {
	var now = new Date();
	var nowDayOfWeek = now.getDay();
	var nowDay = now.getDate();
	var nowMonth = now.getMonth();
	var nowYear = now.getYear();
	nowYear += (nowYear < 2000) ? 1900 : 0;
	return nowYear + "-" + (nowMonth+1) + "-" + (nowDay + (6 - nowDayOfWeek));
}

function Date_getMonthMaxDay(_nYear, _nMonth){
	if(_nMonth == 2) {
		if(_nYear % 100 == 0) {
			if(_nYear % 400 == 0) {
				return 29;
			} else {
				return 28;
			}
		} else if(_nYear % 4 == 0) {
			return 29;
		} else {
			return 28;
		}
	}

	switch(_nMonth) {
		case 1  :
		case 3  :
		case 5  :
		case 7  :
		case 8  :
		case 10 :
		case 12 :
			return 31;
		case 4  :
		case 6  :
		case 9  :
		case 11 :
			return 30;
	}
}

function Date_getMonthStartDate() {
	var now = new Date();
	var nowDay = now.getDate();
	var nowMonth = now.getMonth();
	var nowYear = now.getYear();
	nowYear += (nowYear < 2000) ? 1900 : 0;
	return nowYear + "-" + (nowMonth+1) + "-1";
}

function Date_getQuarterStartDate(){
	var now = new Date();
	var nowDay = now.getDate();

	var nowMonth = now.getMonth();
	if(nowMonth<3){
		nowMonth = 0;
	}else if(nowMonth>=3 && nowMonth<6){
		nowMonth = 3;
	}else if(nowMonth>=6 && nowMonth<9){
		nowMonth = 6;
	}else if(nowMonth>=9){
		nowMonth = 9;
	}

	var nowYear = now.getYear();
	nowYear += (nowYear < 2000) ? 1900 : 0;
	return nowYear + "-" + (nowMonth+1) + "-1";
}

function Date_getYearStartDate() {
	var now = new Date();
	var nowYear = now.getYear();
	nowYear += (nowYear < 2000) ? 1900 : 0;
	return nowYear + "-1-1";
}

function Date_getNowDate() {
	var now = new Date();
	var nowDay = now.getDate();
	var nowMonth = now.getMonth();
	var nowYear = now.getYear();
	nowYear += (nowYear < 2000) ? 1900 : 0;
	return nowYear + "-" + (nowMonth+1) + "-" + nowDay;
}

var validation = {
    kiemTraRong: function(value,errId,name){
        if (value.trim===''){
            document.getElementById(errId).style.display='block';
            document.getElementById(errId).innerHTML=`${name} không được bỏ trống!`;
            return;
        }
        document.getElementById(errId).style.display='none';
        return true;
    }
}
document.addEventListener('DOMContentLoaded',()=>{
    //
    const btn1 = document.getElementById("btn1");//button
    const monndai = document.getElementById("monndai");//p
    const kaisetsu = document.getElementById("kaisetsu");//p
    const usIn = document.getElementById("usIn");//div

    //btn1が押されたとき
    let waru = Math.floor(Math.random()*9) + 1;

    btn1.addEventListener('click',()=>{
        //
        //リセット
        kaisetsu.innerHTML = "";

        //連打防止
        btn1.disabled = true;

        //変数宣言
        //エレメント作成
        const submti_btn = document.createElement("button");
        const giveup_btn = document.createElement("button");
        //問題を作成
        let waru = Math.floor(Math.random()*9) + 2;
        let warare = 0;

        //変数調整
        while(warare % waru === 0){
            //
            warare = Math.floor(Math.random()*(waru*9)) + waru;
        }

        //模範解答作成
        let ans = {
            syou: 0,
            amari: 0
        }

        for(let i = 1; i <= 9; i++){
            if(warare - waru*i < waru){
                ans.syou = i;
                ans.amari = warare - waru*i;
                break;
            }
        }

        //問題,usIn表示
        monndai.innerHTML = warare+"÷"+waru;
        submti_btn.innerHTML = "答え合わせをする";
        giveup_btn.innerHTML = "この問題をあきらめる";
        usIn.appendChild(submti_btn);
        usIn.appendChild(giveup_btn);

        //usIn下のボタン動作
        submti_btn.addEventListener('click',()=>{
            //
            //誤操作防止
            submti_btn.disabled = true;
            giveup_btn.disabled = true;

            const syou = document.getElementById("syou").value;
            const amari = document.getElementById("amari").value;
            const check = document.createElement("span");//span
            check.setAttribute("id","TorF");

            if(syou == ans.syou && amari == ans.amari){
                //
                check.innerHTML = " 〇";
                check.style.color = 'red';
                monndai.innerHTML += " = "+syou+" あまり "+amari;
                monndai.appendChild(check);
                kaisetsu.innerHTML = "正解";
                btn1.innerHTML = "もう一度挑戦する";
                btn1.disabled = false;
                submti_btn.remove();
                giveup_btn.remove();
            }else{
                //
                check.innerHTML = " ✕";
                check.style.color = 'blue';
                if(syou != "" && amari != ""){
                    monndai.innerHTML += " = "+syou+" あまり "+amari;
                }else{
                    monndai.innerHTML += " = 未回答";
                }
                monndai.appendChild(check);
                kaisetsu.innerHTML = "不正解<br>";
                kaisetsu.innerHTML += waru+" x "+ans.syou+" = "+waru*ans.syou+" が九九の"+waru+"の段でいちばん"+warare+"にちかい数で"+warare+"より小さい数です.<br>また,あまりは"+warare+" - ("+waru+" x "+ans.syou+") = "+ans.amari+" より "+ans.amari+"<br>よって<span class='taisetsu'>"+warare+" ÷ "+waru+" = "+ans.syou+" あまり "+ans.amari+"</span> が正解です.";
                btn1.innerHTML = "もう一度挑戦する";
                btn1.disabled = false;
                submti_btn.remove();
                giveup_btn.remove();
            }
        });

        giveup_btn.addEventListener('click',()=>{
            //
            const check = document.createElement("span");//span

            check.innerHTML = " 未回答";
            check.style.color = 'blue';
            kaisetsu.innerHTML = "未回答<br>";
            monndai.appendChild(check);
            kaisetsu.innerHTML += waru+" x "+ans.syou+" = "+waru*ans.syou+" が九九の"+waru+"の段でいちばん"+warare+"にちかい数で"+warare+"より小さい数です.<br>また,あまりは"+warare+" - ("+waru+" x "+ans.syou+") = "+ans.amari+" より "+ans.amari+"<br>よって<span class='taisetsu'>"+warare+" ÷ "+waru+" = "+ans.syou+" あまり "+ans.amari+"</span> が正解です.";

            btn1.innerHTML = "もう一度挑戦する";
            btn1.disabled = false;
            submti_btn.remove();
            giveup_btn.remove();
        });

    });
});
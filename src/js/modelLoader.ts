import * as THREE from '../vendor/three/three';

export class ModelLoader {
    filename: string;
    constructor(public scene: any, public loader: any) {
        // let scene:any = new THREE.Scene();
        // let loader: any = new THREE.ObjectLoader();
    }
    loadAllModels() {

        // THREE js does not like 'this.scene', workaround        
        var scene: any = this.scene;
        var loader: any = this.loader;
        var E11_5: any = ['CoP.json', 'CSP.json', 'D.json', 'EN.json', 'F.json', 'H.json', 'is.json', 'isA.json', 'isADL.json', 'isAVL.json', 'isB.json', 'isF.json', 'isR.json', 'JcP.json', 'M.json', 'm1.json', 'm1A.json', 'm1AD.json', 'm1ADL.json', 'm1AVL.json', 'm1B.json', 'm1F.json', 'm1R.json', 'm2.json', 'm2A.json', 'm2AD.json', 'm2ADL.json', 'm2AL.json', 'm2AVL.json', 'm2B.json', 'm2F.json', 'm2R.json', 'MH.json', 'mouse.json', 'MTg.json', 'MTt.json', 'NP.json', 'p1.json', 'p1A.json', 'p1AVL.json', 'p1B.json', 'p1F.json', 'p1R.json', 'p2.json', 'p2A.json', 'p2AAV.json', 'p2AD.json', 'p2AL.json', 'p2B.json', 'p2F.json', 'p2R.json', 'p3.json', 'p3A.json', 'p3AD.json', 'p3AL.json', 'p3APV.json', 'p3B.json', 'p3F.json', 'p3R.json', 'Pall.json', 'PCom.json', 'PcP.json', 'PH.json', 'PHy.json', 'PHyA.json', 'D.json', 'M.json', 'PHyB.json', 'PHyF.json', 'PIsTg.json', 'PIsTt.json', 'PMH.json', 'PO.json', 'POA.json', 'POH.json', 'POR.json', 'POTel.json', 'PPaA.json', 'PPH.json', 'PSPa.json', 'Pt.json', 'PTh.json', 'PThTg.json', 'PtTg.json', 'r1.json', 'r10.json', 'r10A.json', 'r10B.json', 'r10F.json', 'r10R.json', 'r11.json', 'r11A.json', 'r11B.json', 'r11F.json', 'r11R.json', 'r1A.json', 'r1B.json', 'r1F.json', 'r1R.json', 'r2.json', 'r2A.json', 'r2B.json', 'r2F.json', 'r2R.json', 'r3.json', 'r3A.json', 'r3B.json', 'r3F.json', 'r3R.json', 'r4.json', 'r4A.json', 'r4B.json', 'r4F.json', 'r4R.json', 'r5.json', 'r5A.json', 'r5B.json', 'r5F.json', 'r5R.json', 'r6.json', 'r6A.json', 'r6B.json', 'r6F.json', 'r6R.json', 'r7.json', 'r7A.json', 'r7B.json', 'r7F.json', 'r7R.json', 'r8.json', 'r8A.json', 'r8B.json', 'r8F.json', 'r8R.json', 'r9.json', 'r9A.json', 'r9B.json', 'r9F.json', 'r9R.json', 'RSP.json', 'SP.json', 'SpA.json', 'SPall.json', 'SpB.json', 'SpC.json', 'SpF.json', 'SpR.json', 'Tel.json', 'TelA.json', 'TelH.json', 'TelR.json', 'Th.json', 'ThTg.json', 'THy.json', 'THyA.json', 'D.json', 'I.json', 'THyB.json', 'THyF.json', 'TPaA.json', 'TSPaA.json', 'ventricles.json', 'v_CSP.json', 'v_D.json', 'v_F.json', 'v_H.json', 'v_is.json', 'v_isA.json', 'v_isB.json', 'v_M.json', 'v_m1.json', 'v_m1A.json', 'v_m1B.json', 'v_m2.json', 'v_m2A.json', 'v_m2B.json', 'v_MH.json', 'v_MTg.json', 'v_MTt.json', 'v_p1.json', 'v_p1A.json', 'v_p1B.json', 'v_p2.json', 'v_p2A.json', 'v_p2B.json', 'v_p3.json', 'v_p3A.json', 'v_p3B.json', 'v_PH.json', 'v_PHy.json', 'v_PHyA.json', 'v_PHyB.json', 'v_PIsTg.json', 'v_PIsTt.json', 'v_PMH.json', 'v_POA.json', 'v_POTel.json', 'v_PPH.json', 'v_Pt.json', 'v_PTh.json', 'v_PThTg.json', 'v_PtTg.json', 'v_r1.json', 'v_r10.json', 'v_r10A.json', 'v_r10B.json', 'v_r11.json', 'v_r11A.json', 'v_r11B.json', 'v_r1A.json', 'v_r1B.json', 'v_r2.json', 'v_r2A.json', 'v_r2B.json', 'v_r3.json', 'v_r3A.json', 'v_r3B.json', 'v_r4.json', 'v_r4A.json', 'v_r4B.json', 'v_r5.json', 'v_r5A.json', 'v_r5B.json', 'v_r6.json', 'v_r6A.json', 'v_r6B.json', 'v_r7.json', 'v_r7A.json', 'v_r7B.json', 'v_r8.json', 'v_r8A.json', 'v_r8B.json', 'v_r9.json', 'v_r9A.json', 'v_r9B.json', 'v_RSP.json', 'v_SP.json', 'v_SpA.json', 'v_SpB.json', 'v_SpC.json', 'v_Tel.json', 'v_TelA.json', 'v_Th.json', 'v_ThTg.json', 'v_THy.json', 'v_THyA.json', 'v_THyB.json'];

        var P14:any = ['CSP..json','D..json','F..json','H..json','is..json','isA..json','isB..json','isF..json','isR..json','M..json','m1..json','m1A..json','m1B..json','m1F..json','m1R..json','m2..json','m2A..json','m2B..json','m2F..json','m2R..json','MH..json'];

        for (let entry of P14) {
            console.log(entry); // 1, "string", false
            // loader.load('dist/models/E11.5/Meshes/' + entry, 
            loader.load('dist/models/P14/Meshes/' + entry, function (obj: any) {
                scene.add(obj);
            });
        }
    }

    getScene() {
        return this.scene;
    }
    getLoader() {
        return this.loader;
    }
}



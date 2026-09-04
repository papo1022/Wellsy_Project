import html2canvas from "html2canvas";

import jsPDF from "jspdf";


// =========================================
// 파일명 날짜
// =========================================

const getToday = () => {


    const now
        = new Date();


    const year
        = now.getFullYear();


    const month
        = String(
            now.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day
        = String(
            now.getDate()
        ).padStart(
            2,
            "0"
        );


    return `${year}-${month}-${day}`;
};


// =========================================
// 화면 캡처
// =========================================

const captureReport = async element => {


    if(!element) {

        throw new Error(
            "다운로드할 영역이 없습니다."
        );
    }


    const canvas
        = await html2canvas(

            element,

            {
                scale : 2,

                useCORS : true,

                backgroundColor : "#ffffff",

                logging : false,

                scrollX : 0,

                scrollY : -window.scrollY
            }
        );


    return canvas;
};


// =========================================
// PDF 다운로드
// =========================================

const downloadStatusPdf
    = async (
        element,
        fileName = "부서별_건강리포트"
    ) => {


        const canvas
            = await captureReport(
                element
            );


        /*
         * A4 세로
         */
        const pdf
            = new jsPDF(

                "p",

                "mm",

                "a4"
            );


        const pdfWidth
            = pdf.internal
                .pageSize
                .getWidth();


        const pdfHeight
            = pdf.internal
                .pageSize
                .getHeight();


        const margin
            = 8;


        const printableWidth
            = pdfWidth
                -
                margin * 2;


        const printableHeight
            = pdfHeight
                -
                margin * 2;


        /*
         * A4 한 페이지에 들어갈
         * Canvas 높이 계산
         */
        const pageHeightPx
            = Math.floor(

                canvas.width
                *
                (
                    printableHeight
                    /
                    printableWidth
                )
            );


        let offsetY = 0;

        let pageIndex = 0;


        while(
            offsetY
            <
            canvas.height
        ) {


            const sliceHeight
                = Math.min(

                    pageHeightPx,

                    canvas.height
                        -
                        offsetY
                );


            // 현재 페이지 Canvas
            const pageCanvas
                = document.createElement(
                    "canvas"
                );


            pageCanvas.width
                = canvas.width;


            pageCanvas.height
                = sliceHeight;


            const context
                = pageCanvas.getContext(
                    "2d"
                );


            context.drawImage(

                canvas,

                0,
                offsetY,
                canvas.width,
                sliceHeight,

                0,
                0,
                canvas.width,
                sliceHeight
            );


            const imageData
                = pageCanvas
                    .toDataURL(
                        "image/png"
                    );


            /*
             * PDF에서 실제 이미지 높이
             */
            const imageHeight
                = (
                    sliceHeight
                    *
                    printableWidth
                )
                /
                canvas.width;


            if(pageIndex > 0) {

                pdf.addPage();
            }


            pdf.addImage(

                imageData,

                "PNG",

                margin,

                margin,

                printableWidth,

                imageHeight
            );


            offsetY
                += sliceHeight;


            pageIndex++;

        }


        pdf.save(

            `${fileName}_${getToday()}.pdf`
        );

    };


// =========================================
// PNG 다운로드
// =========================================

const downloadStatusPng
    = async (
        element,
        fileName = "부서별_건강리포트"
    ) => {


        const canvas
            = await captureReport(
                element
            );


        const link
            = document.createElement(
                "a"
            );


        link.download
            = `${fileName}_${getToday()}.png`;


        link.href
            = canvas.toDataURL(
                "image/png"
            );


        link.click();

    };


export {

    downloadStatusPdf,

    downloadStatusPng

};
copy($$("table:first-of-type td.chars").map(cell => cell.parentElement).reduce((html, row) => {
                const cells = row.children;
                return html + `{"e": "${cells[2].innerText}", "n": "${cells[14].innerText}"},\r\n`;
            }, ""));
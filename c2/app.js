$(document).ready(() => {
    _('encoded', +Infinity); _('decoded', -Infinity);
    setTimeout(() => $(encodedI).focus(), 1000);
});

var _ = (Δ, Ξ) => {
    $(`#${Δ}I`).on('propertychange change click keyup input paste', (α) => {
        let π = window[Ξ > -Infinity ? 'encode' : 'decode']($(`#${Δ}I`).val());
        $(`#O`).text(π);
        $(".output-wrapper").css('display', π.length ? 'block' : 'none');
    });
}

var Θ = () => {
    let α = document.createRange(),
    ρ = window.getSelection();
    α.selectNodeContents($(`#O`)[0]);
    ρ.removeAllRanges();
    ρ.addRange(α);
    document.execCommand('copy') && $(`#C span`).addClass('shown');
}
var encode = (λ) => λ.split('').map((_, β) => String.fromCharCode(λ.charCodeAt(β) + 1)).join('');
var decode = (λ) => λ.split('').map((_, β) => String.fromCharCode(λ.charCodeAt(β) - 1)).join('');

$(window).on("animationend", () => $('.shown').removeClass('shown'));
$(document).ready(() => {
    _('encoded', +Infinity); _('decoded', -Infinity);
});

var _ = (Δ, Ξ) => {
    $(`#${Δ}I`).on('propertychange change click keyup input paste', () => {
        let π = window[Ξ > -Infinity ? 'encode' : 'decode']($(`#${Δ}I`).val());
        $(`#${Δ}O`).text(π);
        $(`#${Δ}C`).css('display', π ? 'block' : 'none');
    });
}

var Θ = (Δ) => {
    let α = document.createRange();
    let ρ = window.getSelection();
    α.selectNodeContents($(`#${Δ}O`)[0]);
    ρ.removeAllRanges();
    ρ.addRange(α);
    document.execCommand('copy');
}

var decode = (λ) => λ.split('').map((_, β) => String.fromCharCode(λ.charCodeAt(β) + 1)).join('');
var encode = (λ) => λ.split('').map((_, β) => String.fromCharCode(λ.charCodeAt(β) - 1)).join('');
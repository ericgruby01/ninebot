const cry = [
	':sob: O choro é livre',
	':pray: Deus nos acuda',
	':fire: #forabolsonaro',
	':point_right: Faz arminha que baixa',
	':see_no_evil: Não quero nem ver...',
	':broken_heart: Ai meu coração!',
	':tired_face: Que desespero, meu Deus...',
	':triumph: Você gosta de sofrer? Pare de ficar vendo isso!',
	':innocent: Baixa logo, nunca te pedi nada, pfv'
]

Math.fmod = function (a, b) {
	return Number((a - Math.floor(a / b) * b).toPrecision(8))
}

const isDM = msg => msg.channel.type === 'dm'

const deleteMessage = msg => (!isDM(msg) ? msg.delete() : false)

const isConsigServer = msg => process.env.CONSIG_SERVER === msg.channel.guild.id

/**
 * Validate NB
 * @param {String} nb
 * @return {Boolean}
 */
const validateNB = nb => {
	var comparaNb = nb.padStart(10, '0')
	var num = nb.substr(0, nb.length - 1)
	num = num.padStart(9, '0')
	var dig = mod11(num, 1, 9, true)
	return comparaNb == num + dig
}

/**
 * Operation to validate NB
 *
 * @param {String}  numDado
 * @param {Int}     numDig
 * @param {Int}     limMult
 * @param {Boolean} x10
 *
 * @return {String}
 */
const mod11 = (numDado, numDig, limMult, x10) => {
	if (!x10) {
		numDig = 1
	}
	var dado = numDado
	for (var n = 1; n <= numDig; n++) {
		var soma = 0
		var mult = 2
		for (var i = dado.length - 1; i >= 0; i--) {
			soma += mult * parseInt(dado.substr(i, 1))
			if (++mult > limMult) {
				mult = 2
			}
		}
		var dig
		if (x10) {
			dig = Math.fmod(Math.fmod(soma * 10, 11), 10)
		} else {
			dig = Math.fmod(soma, 11)
			if (dig == 10) {
				dig = 'X'
			}
		}
		dado += '' + dig
	}
	return dado.substr(dado.length - numDig)
}

/**
 * Validate CPF
 * @param {string} cpf
 * @return {boolean}
 */
const validateCPF = cpf => {
	cpf = cpf.replace(/[^\d]+/g, '')
	cpf = cpf.padStart(11, '0')
	if (cpf == '') return false
	if (
		cpf.length != 11 ||
		cpf == '00000000000' ||
		cpf == '11111111111' ||
		cpf == '22222222222' ||
		cpf == '33333333333' ||
		cpf == '44444444444' ||
		cpf == '55555555555' ||
		cpf == '66666666666' ||
		cpf == '77777777777' ||
		cpf == '88888888888' ||
		cpf == '99999999999'
	)
		return false
	var add = 0
	for (var i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i)
	var rev = 11 - (add % 11)
	if (rev == 10 || rev == 11) rev = 0
	if (rev != parseInt(cpf.charAt(9))) return false
	add = 0
	for (var i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i)
	rev = 11 - (add % 11)
	if (rev == 10 || rev == 11) rev = 0
	if (rev != parseInt(cpf.charAt(10))) return false
	return true
}

module.exports = {
	cry,
	validateNB,
	validateCPF,
	deleteMessage,
	isDM,
	isConsigServer
}

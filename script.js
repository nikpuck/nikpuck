const connectWalletButton = document.getElementById('connectWallet');
const walletAddressElement = document.getElementById('walletAddress').querySelector('span');
const calculateEarningsButton = document.getElementById('calculateEarnings');
const stakeAmountInput = document.getElementById('stakeAmount');
const apyInput = document.getElementById('apy');
const resultElement = document.getElementById('result').querySelector('span');

// Проверка MetaMask
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
} else {
    alert('Please install MetaMask to use this dApp!');
}

// Подключение кошелька
connectWalletButton.addEventListener('click', async () => {
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        walletAddressElement.textContent = account;
        calculateEarningsButton.disabled = false; // Разблокировать кнопку расчета доходности

    } catch (error) {
        console.error('Error connecting to wallet:', error);
    }
});

// Расчет доходности стейкинга
calculateEarningsButton.addEventListener('click', () => {
    const stakeAmount = parseFloat(stakeAmountInput.value);
    const apy = parseFloat(apyInput.value);

    if (isNaN(stakeAmount) || isNaN(apy)) {
        alert('Please enter valid numbers for staking amount and APY.');
        return;
    }

    // Простой расчет доходности: stake * (apy / 100)
    const earnings = stakeAmount * (apy / 100);
    resultElement.textContent = earnings.toFixed(4); // Отображаем результат с 4 знаками после запятой
});

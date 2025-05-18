const API_URL = '/api/records';

async function loadFinancialRecords() {
  try {
    document.getElementById('recharge-records').innerHTML = '<div class="loading">Loading recharge history...</div>';
    document.getElementById('withdraw-records').innerHTML = '<div class="loading">Loading withdraw history...</div>';
    
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const data = await response.json();
    
    const rechargeRecords = data.filter(item => item.type === 'recharge');
    const withdrawRecords = data.filter(item => item.type === 'withdraw');
    
    const rechargeDiv = document.getElementById('recharge-records');
    const withdrawDiv = document.getElementById('withdraw-records');
    
    rechargeDiv.innerHTML = rechargeRecords.length ?
      rechargeRecords.map(item => `
        <div class="record">
          <div class="record-title">Tzs ${item.amount.toLocaleString()} 
            <span class="status-${item.status}">${item.status.toUpperCase()}</span>
          </div>
          <small>Date: ${new Date(item.date).toLocaleDateString()} | Method: ${item.method}</small>
        </div>
      `).join('') :
      '<div>No recharge records found</div>';
    
    withdrawDiv.innerHTML = withdrawRecords.length ?
      withdrawRecords.map(item => `
        <div class="record">
          <div class="record-title">Tzs ${item.amount.toLocaleString()} 
            <span class="status-${item.status}">${item.status.toUpperCase()}</span>
          </div>
          <small>Date: ${new Date(item.date).toLocaleDateString()} | Method: ${item.method}</small>
        </div>
      `).join('') :
      '<div>No withdraw records found</div>';
    
  } catch (error) {
    console.error('Error loading records:', error);
    document.getElementById('recharge-records').innerHTML = '<div style="color:red">Error loading recharge history</div>';
    document.getElementById('withdraw-records').innerHTML = '<div style="color:red">Error loading withdraw history</div>';
  }
}

window.addEventListener('DOMContentLoaded', loadFinancialRecords);
<a href="https://mizuyang.github.io/form-auto-save/#/">Demo</a>

<ol>
  <li>表單輸入文字後 1秒內未操作, 就會自動儲存 (debounce)</li>
  <li>此處模擬 AJAX 非同步3秒後才儲存完畢, 並顯示儲存成功提示</li>
  <li>若在儲存完畢前離開、重整頁面, 就會彈窗提示用戶表單尚未儲存好(beforeunload)</li>
</ol>
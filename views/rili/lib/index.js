let year = window.location.hash.replace('#', '');
const host = window.location.host;
const WEB_PATH = host.includes('github') ? '/dev' : ''

if (!year) year = new Date().getFullYear();

let yArr = [2025, 2026, 2027, 2028, 2029, 2030]
if (!yArr.includes(Number(year))) year = yArr[yArr.length - 1]

const timeline = $.ajax({ async: false, url: `${WEB_PATH}/views/rili/lib/timeline.json` }).responseJSON;

updateYear()
switchoverState()
updateTimeLine()

function updateYear() {
  document.title = `📅 ${year}年`
  document.getElementsByClassName('yearrili')[0].src = `../../src/img/rili/${year}.png`
}

function switchoverState() {
  const greaterThanThreshold = yArr.filter(num => num > Number(year));
  const lessThanThreshold = yArr.filter(num => num < Number(year));

  let leftDom = document.getElementsByClassName('switchover left')[0];
  let rightDom = document.getElementsByClassName('switchover right')[0];

  if (greaterThanThreshold.length == 0) rightDom.classList.add('hidden')
  else rightDom.classList.remove('hidden')

  if (lessThanThreshold.length == 0) leftDom.classList.add('hidden')
  else leftDom.classList.remove('hidden')
}

function handleClick(num) {
  year = Number(year) + num;
  updateYear()
  switchoverState()
  updateTimeLine()
}

function updateTimeLine() {

  const lists = timeline[year]
  if (lists) {
    let Htm = ``
    lists.forEach(item => {
      const { time, title, content } = item;
      Htm += `<li>
        <div class="item__tail"></div>
        <div class="item__node"></div>
        <div class="item__wrapper">
          <div class="item__timestamp">${time}</div>
          <div class="item__content">
            <div class="card__box">
              <div class="card__body">
                <h4>${title}</h4>
                <p>${content}</p>
              </div>
            </div>
          </div>
        </div>
      </li>`
    })
    $('.timelinewrap ul').empty().html(Htm)
    $('.timelinewrap').fadeIn()
  } else {
    $('.timelinewrap ul').empty()
    $('.timelinewrap').fadeOut()
  }
}

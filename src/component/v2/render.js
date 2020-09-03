import plugins from './plugins/index'
import { getCalendarConfig } from './utils/index'

/**
 * 渲染日历
 */
export function renderCalendar(calendarData, config) {
  return new Promise(resolve => {
    const Component = this
    if (Component.firstRender === void 0) {
      Component.firstRender = true
    } else {
      Component.firstRender = false
    }
    const calendarConfig = config || getCalendarConfig(Component)
    const exitData = Component.data.calendar || {}
    for (let plugin of plugins.installed) {
      const [, p] = plugin
      if (typeof p.beforeRender === 'function') {
        calendarData = p.beforeRender(
          { ...exitData, ...calendarData },
          calendarConfig,
          Component
        )
      }
    }
    Component.setData(
      {
        calendar: calendarData
      },
      () => {
        resolve({
          calendar: calendarData,
          firstRender: Component.firstRender
        })
      }
    )
  })
}
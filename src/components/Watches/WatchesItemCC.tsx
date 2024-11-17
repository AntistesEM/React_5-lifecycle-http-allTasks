import React from "react";
import "./watches.css";

interface WatchesItemCCProps {
  title: string;
  zone: string;
  currentTime: Date; // Добавляем пропс для текущего времени
}

export class WatchesItemCC extends React.Component<WatchesItemCCProps> {
  render() {
    const { title, zone, currentTime } = this.props;

    // Получаем текущее время в UTC и корректируем по временной зоне
    const utcSeconds = currentTime.getUTCSeconds();
    const utcMinutes = currentTime.getUTCMinutes();
    let utcHours = currentTime.getUTCHours() + Number(zone);

    // Рассчитываем углы для стрелок
    const secondsDegree = utcSeconds * 6; // 360° / 60 seconds
    
    const minutesDegree = utcMinutes * 6 + utcSeconds / 10; // 360° / 60 minutes + (секунды / 10)
    const hoursDegree = utcHours * 30 + utcMinutes / 2; // 360° / 12 hours + (минуты / 2)

    return (
      <div className="watches-item">
        <span className="watches-item-span">{title}</span>
        <button className="watches-item-btn" type="button" onClick={this.handleClickDelete}>X</button>
        <div className="clock">
          <div className="hour-hand" style={{ transform: `rotate(${hoursDegree}deg)` }}></div>
          <div className="minute-hand" style={{ transform: `rotate(${minutesDegree}deg)` }}></div>
          <div className="second-hand" style={{ transform: `rotate(${secondsDegree}deg)` }}></div>
        </div>
      </div>    
    )
  }

  handleClickDelete = (e: React.PointerEvent<HTMLButtonElement>) => {
    console.log('Delete', e);
    const itemElement = (e.target as HTMLButtonElement).closest('.watches-item');
    if (itemElement) {
      itemElement.remove();     
    }
  }
}

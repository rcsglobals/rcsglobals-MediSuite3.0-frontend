
export function FormatDate(dateString: any) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options: any = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
}

export function getCurrDate() {
    var currentDate = new Date();
    var options: any = { month: 'long', day: 'numeric', year: 'numeric' };
    var formattedDate = currentDate.toLocaleDateString('en-US', options);
    return formattedDate;
  }

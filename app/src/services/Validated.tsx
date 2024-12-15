export function validateName(name: string): boolean {
    if (!name.trim()) return false;
    const nameParts = name.trim().split(/\s+/);
    const nameRegex = /^[a-zA-ZàáảãạăắằẳẵặâấầẩẫậbcdđeéẻẽẹêếềểễệfghiíìỉĩịjklmnoóòỏõọôốồổỗộơớờởỡợpqrstuúùủũụvwxỳýỷỹệzÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỗƠỚỜỞỠỢÚÙỦŨỤÝỲỶỸỴ]+$/u;
    return (
        nameParts.length >= 2 && // Tên phải có ít nhất 2 phần
        nameParts.every(part => part.length >= 2 && nameRegex.test(part)) // Mỗi phần phải có ít nhất 2 ký tự và hợp lệ
    );
}

export function validateUsername(username: string): boolean {
    const usernameRegex = /^[a-zA-Z0-9][a-zA-Z0-9._]{2,19}$/;
    return usernameRegex.test(username.trim());
}

export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254; // Thêm kiểm tra độ dài tối đa cho email
}


export function validatePhoneNumber(phoneNumber: string): boolean {
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    return phoneRegex.test(phoneNumber); // Kiểm tra xem số điện thoại có hợp lệ không
}

export function validateDate(dateString: string): boolean {
    return !!dateString; 
}

export function validateTime(timeString: string): boolean {
    return !!timeString; 
}

export function validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{12,}$/;
    return passwordRegex.test(password); // Kiểm tra xem mật khẩu có hợp lệ không
}

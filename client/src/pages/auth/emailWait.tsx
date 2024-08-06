const WaitEmailComponent = () => {
  return (
    <div className="flex justify-center items-center text-center mt-24 ">
      <p className="lg:text-2xl text-lg tracking-widest ">
        メールアドレスの仮登録に成功しました！
        <br />
        入力されたメールアドレスにメールを送信しました！
        <br />
        メール内の、「承認する」ボタンをクリックして認証を完了してください！
      </p>
      {/* ユーザーには認証中であることを示すUIなどを表示 */}
    </div>
  );
};

export default WaitEmailComponent;

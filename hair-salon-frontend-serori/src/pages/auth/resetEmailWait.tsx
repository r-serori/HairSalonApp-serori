const ResetWaitEmailComponent = () => {
  return (
    <div className="flex justify-center items-center text-center mt-24 ">
      <p className="lg:text-2xl text-lg tracking-widest ">
        あなたのメールアドレスにメールを送信しました！
        <br />
        メール内の、「パスワードをリセットする」ボタンをクリックしてください！
      </p>
      {/* ユーザーには認証中であることを示すUIなどを表示 */}
    </div>
  );
};

export default ResetWaitEmailComponent;

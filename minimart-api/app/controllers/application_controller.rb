class ApplicationController < ActionController::API
  before_action :set_or_create_current_user

  private

  def current_user
    @current_user
  end

  # Appendix 参照
  # X-User-Name ヘッダーで指定されたユーザー名のユーザーを無条件に作成する。
  # 当然ながら production コードでこんな処理をしてはいけない。
  def set_or_create_current_user
    username = request.headers['X-User-Name']
    return if username.blank?
    @current_user = User.find_or_create_by!(name: username[0, 255])
  end
end

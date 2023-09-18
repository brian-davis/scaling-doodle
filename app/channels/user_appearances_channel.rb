# app/channels/user_appearances_channel.rb

class UserAppearancesChannel < ApplicationCable::Channel
  def subscribed
    Rails.logger.debug { "UserAppearancesChannel subscribed: #{current_user.email}" }
    Rails.logger.debug { "params: #{params}" } #  {"channel"=>"AppearancesChannel"}

    stream_from("UserAppearancesChannel")
    current_user.appear
    ActionCable.server.broadcast("UserAppearancesChannel", {
      event: "appear",
      user_id: current_user.id,
      user_ids: User.all_appeared
    })
  end

  def unsubscribed
    Rails.logger.debug { "UserAppearancesChannel unsubscribed: #{current_user.email}" }
    Rails.logger.debug { "params: #{params}" }

    current_user.disappear
    ActionCable.server.broadcast("UserAppearancesChannel", {
      event: "disappear",
      user_id: current_user.id,
      user_ids: User.all_appeared
    })
    stop_stream_from("UserAppearancesChannel")
  end
end

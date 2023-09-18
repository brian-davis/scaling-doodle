module Appearance
  CACHE_KEY = "appearances".freeze

  class << self
    def redis_connection
      $redis
    end

    def included(base)
      base.extend(ClassMethods)
    end
  end

  module ClassMethods
    def all_appeared
      Appearance.redis_connection.smembers(Appearance::CACHE_KEY)
    end
  end

  def appear
    if Appearance.redis_connection.sadd?(Appearance::CACHE_KEY, self.id)
      Rails.logger.debug { "Added user: #{self.id} to '#{Appearance::CACHE_KEY}' set" }
      return true
    end
    false
  end

  def appeared?
    self.class.all_appeared.include?(self.id)
  end

  def disappear
    if Appearance.redis_connection.srem?(Appearance::CACHE_KEY, self.id)
      Rails.logger.debug { "Removed user: #{self.id} from '#{Appearance::CACHE_KEY}' set" }
      return true
    end
    false
  end
end
